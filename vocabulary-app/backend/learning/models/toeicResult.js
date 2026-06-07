const mongoose = require('mongoose');

const toeicResultSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  testId: { type: String, required: true },
  part: { type: String, required: true },
  answers: [
    {
      questionId: String,
      selectedAnswer: String,
      correctAnswer: String,
      isCorrect: Boolean
    }
  ],
  score: { type: Number, required: true },
  total: { type: Number, required: true },
  completedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ToeicResult', toeicResultSchema);
