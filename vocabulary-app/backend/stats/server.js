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
connectDB();

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

const isTeacher = (req, res, next) => {
  if (req.user.role !== 'teacher') return res.status(403).json({ message: 'Forbidden' });
  next();
};

// Lưu lịch sử (gọi từ room/learning)
app.post('/stats/history', authenticate, async (req, res) => {
  const { action, roomId, details } = req.body;
  try {
    const history = new History({ userId: req.user.id, type: req.user.role, action, roomId, details });
    await history.save();
    res.json({ history });
  } catch (error) {
    res.status(400).json({ message: 'Error saving history' });
  }
});

// Lấy lịch sử (teacher/student)
app.get('/stats/history', authenticate, async (req, res) => {
  try {
    const history = await History.find({ userId: req.user.id }).populate('roomId');
    res.json({ history });
  } catch (error) {
    res.status(400).json({ message: 'Error getting history' });
  }
});

// Các route thống kê khác
const PORT = process.env.PORT || 3015;
app.listen(PORT, () => console.log(`Stats service on ${PORT}`));