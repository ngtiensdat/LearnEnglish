require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const connectDB = require('./config/db');
const Vocabulary = require('./models/Vocabulary');

const app = express();
app.use(express.json());

mongoose.set('strictQuery', false);
connectDB();

const authMiddleware = (roles) => (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'Không có token' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!roles.includes(decoded.role)) return res.status(403).json({ message: 'Quyền truy cập bị từ chối' });
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token không hợp lệ' });
  }
};

app.post('/vocab', authMiddleware(['student', 'teacher', 'admin']), async (req, res) => {
  const { word, meaning, example, roomId } = req.body;
  try {
    const room = await mongoose.model('Room').findById(roomId);
    if (!room) return res.status(404).json({ message: 'Không tìm thấy phòng' });
    if (!room.isPublic && !room.participants.includes(req.user.id) && room.creator.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Bạn không có quyền thêm từ vựng vào phòng này' });
    }
    const vocab = new Vocabulary({ word, meaning, example, roomId, creator: req.user.id });
    await vocab.save();
    res.status(201).json(vocab);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete('/vocab/:id', authMiddleware(['admin']), async (req, res) => {
  try {
    await Vocabulary.findByIdAndDelete(req.params.id);
    res.json({ message: 'Xóa từ vựng thành công' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get('/vocab/list/:roomId', authMiddleware(['admin']), async (req, res) => {
  try {
    const vocabs = await Vocabulary.find({ roomId: req.params.roomId });
    res.json(vocabs);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get('/vocab/room/:roomId', authMiddleware(['student', 'teacher', 'admin']), async (req, res) => {
  try {
    const room = await mongoose.model('Room').findById(req.params.roomId);
    if (!room) return res.status(404).json({ message: 'Không tìm thấy phòng' });
    if (!room.isPublic && !room.participants.includes(req.user.id)) {
      return res.status(403).json({ message: 'Bạn không có quyền truy cập phòng này' });
    }
    const vocabs = await Vocabulary.find({ roomId: req.params.roomId });
    res.json(vocabs);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const PORT = process.env.PORT || 3013;
app.listen(PORT, () => console.log(`Vocabulary on ${PORT}`));