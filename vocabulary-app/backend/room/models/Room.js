const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Teacher ID
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }], // Array of question IDs
  showScore: { type: Boolean, default: true }, // Hiển thị/ẩn điểm
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Room', roomSchema);