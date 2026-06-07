require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const connectDB = require('./config/db');
// const Room = require('./models/Room');
// const Question = require('./models/Question');
const StudentAnswer = require('./models/StudentAnswer');
const ToeicResult = require('./models/toeicResult');

const app = express();
app.use(cors());
app.use(express.json());
connectDB();

// ======================
// 🔐 Middleware xác thực JWT
// ======================
const authenticate = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'No token' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// ======================
// 🧑‍🏫 Kiểm tra vai trò giáo viên
// ======================
const isTeacher = (req, res, next) => {
  if (req.user.role !== 'teacher') return res.status(403).json({ message: 'Forbidden' });
  next();
};

// ======================
// 🚀 ROUTE CŨ (PHÒNG HỌC)
// ======================
app.post('/learning/join', authenticate, async (req, res) => {
  const { name, password } = req.body;
  if (req.user.role !== 'student') return res.status(403).json({ message: 'Forbidden' });
  try {
    const room = await Room.findOne({ name });
    if (!room || !(await bcrypt.compare(password, room.password)))
      return res.status(401).json({ message: 'Invalid room or password' });
    res.json({ room: { id: room._id, questions: room.questions, showScore: room.showScore } });
  } catch (error) {
    res.status(400).json({ message: 'Error joining room' });
  }
});

app.post('/learning/submit', authenticate, async (req, res) => {
  const { roomId, answers } = req.body;
  if (req.user.role !== 'student') return res.status(403).json({ message: 'Forbidden' });
  try {
    const room = await Room.findById(roomId).populate('questions');
    if (!room) return res.status(404).json({ message: 'Room not found' });
    let score = 0;
    answers.forEach(a => {
      const q = room.questions.find(q => q._id.toString() === a.questionId);
      if (q && a.selectedAnswer === q.correctAnswer) score++;
    });
    const studentAnswer = new StudentAnswer({ roomId, studentId: req.user.id, answers, score });
    await studentAnswer.save();
    res.json({ score: room.showScore ? score : 'Hidden' });
  } catch (error) {
    res.status(400).json({ message: 'Error submitting answers' });
  }
});

// ======================
// 🧠 ROUTE MỚI (TOEIC TEST)
// ======================

// 📘 Nộp bài TOEIC
app.post('/toeic/submit', authenticate, async (req, res) => {
  try {
    const { testId, part, answers } = req.body; // answers: [{ id, selected }]
    if (!testId || !part || !Array.isArray(answers)) {
      return res.status(400).json({ message: 'Thiếu dữ liệu đầu vào' });
    }

    // 📘 Đọc file đề TOEIC (hỗ trợ cả "full")
    let testData = { title: "", questions: [] };

    if (part === "full") {
      // ✅ Gộp tất cả part1 → part7
      const parts = ["part1", "part2", "part3", "part4", "part5", "part6", "part7"];
      let allQuestions = [];

      for (const p of parts) {
        const filePath = path.join(__dirname, `../../frontend/src/data/toeic/test${testId}/${p}.json`);
        if (fs.existsSync(filePath)) {
          const fileData = JSON.parse(fs.readFileSync(filePath, "utf8"));
          if (fileData.questions && Array.isArray(fileData.questions)) {
            allQuestions = allQuestions.concat(fileData.questions);
          }
        } else {
          console.warn(`⚠️ Không tìm thấy file: ${filePath}`);
        }
      }

      if (allQuestions.length === 0) {
        return res.status(404).json({ message: "Không tìm thấy bất kỳ phần nào của đề TOEIC." });
      }

      testData = {
        title: `TOEIC Test ${testId} - Full Test`,
        questions: allQuestions
      };
    } else {
      // ✅ Đọc từng phần riêng lẻ
      const filePath = path.join(__dirname, `../../frontend/src/data/toeic/test${testId}/${part}.json`);
      if (!fs.existsSync(filePath)) {
        return res.status(404).json({ message: "Không tìm thấy đề thi" });
      }
      testData = JSON.parse(fs.readFileSync(filePath, "utf8"));
    }

    // 🧮 Chấm điểm
    let correct = 0;
    const answerDetail = answers.map((ans) => {
      const q = testData.questions.find((x) => x.id == ans.id);
      const correctAnswer = q ? q.answer : null;
      const isCorrect = correctAnswer === ans.selected;
      if (isCorrect) correct++;
      return {
        questionId: ans.id,
        selectedAnswer: ans.selected,
        correctAnswer,
        isCorrect
      };
    });

    // 💾 Lưu kết quả vào MongoDB
    const result = new ToeicResult({
      userId: req.user.id,
      testId,
      part,
      answers: answerDetail,
      score: correct,
      total: testData.questions.length
    });
    await result.save();

    res.json({
      message: 'Nộp bài thành công',
      score: correct,
      total: testData.questions.length,
      correctDetail: answerDetail
    });

  } catch (error) {
    console.error('Lỗi nộp bài TOEIC:', error);
    res.status(500).json({ message: 'Lỗi khi nộp bài TOEIC' });
  }
});


// 📘 Lấy danh sách kết quả TOEIC của user
app.get('/toeic/results/:userId', authenticate, async (req, res) => {
  try {
    const results = await ToeicResult.find({ userId: req.params.userId })
      .sort({ completedAt: -1 });
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lấy kết quả TOEIC' });
  }
});

// ======================
// ⚙️ KHỞI ĐỘNG SERVER
// ======================
const PORT = process.env.PORT || 3014;
app.listen(PORT, () => console.log(`Learning service on ${PORT}`));
