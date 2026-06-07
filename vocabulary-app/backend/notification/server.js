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
// Tương tự setup

// Gửi thông báo (gọi từ learning khi học sinh tham gia)
app.post('/notify', authenticate, async (req, res) => {
  const { message, toUserId } = req.body;
  // Logic gửi thông báo (e.g., email or socket.io)
  console.log(`Notification to ${toUserId}: ${message}`);
  res.json({ message: 'Notification sent' });
});

const PORT = process.env.PORT || 3016;
app.listen(PORT, () => console.log(`Notification service on ${PORT}`));