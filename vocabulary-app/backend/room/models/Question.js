const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  content: { type: String, required: true },
  options: [{ type: String, required: true }], // Mảng đáp án (e.g., ["A", "B", "C", "D"])
  correctAnswer: { type: Number, required: true }, // Index đúng (0 for A, 1 for B, etc.)
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Question', questionSchema);