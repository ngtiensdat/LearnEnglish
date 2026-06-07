require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const connectDB = require('./config/db');
const Room = require('./models/Room');
const Question = require('./models/Question');

const app = express();
app.use(cors());
app.use(express.json());
mongoose.set('strictQuery', true);
connectDB();

/* -------------------- Middleware -------------------- */
const authenticate = (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.replace('Bearer ', '');
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id: "...", role: "teacher" }
    next();
  } catch (error) {
    console.error('Token verification failed:', error.message);
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

const isTeacher = (req, res, next) => {
  const role = req.user?.role;
  if (role !== 'teacher' && role !== 'admin') {
    return res.status(403).json({ message: 'Access denied: Teacher or Admin only' });
  }
  next();
};

/* -------------------- Routes -------------------- */

// GET /rooms - CHỈ TRẢ ID, KHÔNG POPULATE
// backend/room/server.js
app.get('/', authenticate, async (req, res) => {
  try {
    const rooms = await Room.find()
      .select('name showScore createdAt _id')
      .lean();

    // LUÔN TRẢ 200 + MẢNG
    res.status(200).json(rooms);
  } catch (error) {
    console.error('GET /rooms error:', error);
    res.status(500).json({ message: 'Lỗi server' });
  }
});

// POST /rooms - Tạo phòng mới
app.post('/', authenticate, isTeacher, async (req, res) => {
  const { name, password, showScore } = req.body;

  try {
    // BƯỚC 1: Kiểm tra userId từ token
    const userId = req.user?.id || req.user?._id;
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(401).json({ message: 'Token không hợp lệ: thiếu hoặc sai user ID' });
    }

    // BƯỚC 2: Kiểm tra tên phòng trùng
    if (!name || !password) {
      return res.status(400).json({ message: 'Tên phòng và mật khẩu là bắt buộc' });
    }

    const existingRoom = await Room.findOne({ name });
    if (existingRoom) {
      return res.status(400).json({ message: 'Tên phòng đã tồn tại' });
    }

    // BƯỚC 3: Tạo phòng
    const hashedPassword = await bcrypt.hash(password, 10);
    const room = new Room({
      name: name.trim(),
      password: hashedPassword,
      createdBy: userId,
      showScore: showScore !== undefined ? showScore : true
    });

    await room.save();

    // Trả về phòng đã tạo (không cần populate toàn bộ)
    const roomResponse = {
      _id: room._id,
      name: room.name,
      showScore: room.showScore,
      createdAt: room.createdAt
    };

    res.status(201).json({
      message: 'Tạo phòng thành công',
      room: roomResponse
    });

  } catch (error) {
    console.error('Create room error:', error);

    // Xử lý lỗi validation từ Mongoose
    if (error.name === 'ValidationError') {
      const firstError = Object.values(error.errors)[0].message;
      return res.status(400).json({ message: 'Dữ liệu không hợp lệ: ' + firstError });
    }

    // Lỗi trùng tên (unique index)
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Tên phòng đã tồn tại' });
    }

    res.status(500).json({ message: 'Lỗi server khi tạo phòng' });
  }
});

// POST /rooms/:id/questions - Thêm câu hỏi
app.post('/rooms/:id/questions', authenticate, isTeacher, async (req, res) => {
  const roomId = req.params.id;
  console.log('ADD QUESTIONS - roomId:', roomId, 'type:', typeof roomId);

  if (!mongoose.Types.ObjectId.isValid(roomId)) {
    return res.status(400).json({ message: 'ID phòng không hợp lệ' });
  }

  try {
    const room = await Room.findById(roomId);
    if (!room) return res.status(404).json({ message: 'Phòng không tồn tại' });

    if (!room.createdBy.equals(req.user.id)) {
      return res.status(403).json({ message: 'Không phải chủ phòng' });
    }

    const createdQuestions = [];
    for (const q of questions) {
      if (!q.content || !Array.isArray(q.options) || q.options.length !== 4 || q.correctAnswer == null) {
        return res.status(400).json({ message: 'Mỗi câu hỏi phải có nội dung, 4 đáp án và đáp án đúng' });
      }

      const question = new Question({
        content: q.content,
        options: q.options,
        correctAnswer: q.correctAnswer,
        roomId
      });
      await question.save();
      createdQuestions.push(question);
      room.questions.push(question._id);
    }

    await room.save();
    res.status(201).json({ message: 'Thêm câu hỏi thành công' });
  } catch (error) {
    console.error('Add questions error:', error);
    res.status(500).json({ message: 'Lỗi server' });
  }
});

// DELETE /rooms/:id
app.delete('/rooms/:id', authenticate, isTeacher, async (req, res) => {
  const roomId = req.params.id;
  console.log('DELETE ROOM - roomId:', roomId);

  if (!mongoose.Types.ObjectId.isValid(roomId)) {
    return res.status(400).json({ message: 'ID không hợp lệ' });
  }

  try {
    const room = await Room.findById(roomId);
    if (!room) return res.status(404).json({ message: 'Không tìm thấy phòng' });

    if (!room.createdBy.equals(req.user.id)) {
      return res.status(403).json({ message: 'Không phải chủ phòng' });
    }

    await Question.deleteMany({ roomId });
    await Room.deleteOne({ _id: roomId });
    res.status(200).json({ message: 'Xóa thành công' });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ message: 'Lỗi server' });
  }
});

/* -------------------- Start Server -------------------- */
const PORT = process.env.PORT || 3012;
app.listen(PORT, () => {
  console.log(`Room service running on port ${PORT}`);
});