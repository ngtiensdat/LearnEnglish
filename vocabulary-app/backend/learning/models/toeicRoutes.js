const express = require('express');
const router = express.Router();
const ToeicResult = require('../models/toeicResult');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

// Middleware xác thực JWT (tạm, có thể thay bằng middleware auth dùng chung)
const auth = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'Chưa đăng nhập' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ error: 'Token không hợp lệ' });
  }
};

// POST /toeic/submit
router.post('/toeic/submit', auth, async (req, res) => {
  try {
    const { testId, part, answers } = req.body;
    if (!testId || !part || !Array.isArray(answers)) {
      return res.status(400).json({ error: 'Thiếu dữ liệu đầu vào' });
    }

    // Lấy đáp án đúng từ file JSON (trong thư mục data)
    const filePath = path.join(__dirname, `../../data/toeic/test${testId}/${part}.json`);
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'Không tìm thấy đề thi' });
    }
    const testData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

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
    console.error(error);
    res.status(500).json({ error: 'Lỗi server' });
  }
});

module.exports = router;
