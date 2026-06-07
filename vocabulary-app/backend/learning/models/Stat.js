const mongoose = require('mongoose');
const statSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  score: Number,
  date: Date
});
module.exports = mongoose.model('Stat', statSchema);
