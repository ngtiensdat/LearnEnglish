const mongoose = require('mongoose');

const studentAnswerSchema = new mongoose.Schema({
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  answers: [{ questionId: mongoose.Schema.Types.ObjectId, selectedAnswer: Number }], // Mảng đáp án chọn
  score: { type: Number, default: 0 },
  completedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('StudentAnswer', studentAnswerSchema);