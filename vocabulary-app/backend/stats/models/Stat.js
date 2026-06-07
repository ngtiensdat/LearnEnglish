const mongoose = require('mongoose');
const statSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' },
  progress: Number,
  lastLearned: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Stat', statSchema);