const mongoose = require('mongoose');
const quizSchema = new mongoose.Schema({
  questions: [{ word: String, options: [String], correct: String }],
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  score: Number
});
module.exports = mongoose.model('Quiz', quizSchema);