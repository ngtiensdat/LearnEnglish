const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['student', 'teacher'], required: true },
  action: { type: String, required: true }, // e.g., 'created room', 'completed quiz'
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' },
  details: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('History', historySchema);