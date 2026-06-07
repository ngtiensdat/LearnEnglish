const mongoose = require('mongoose');
const vocabSchema = new mongoose.Schema({
  word: { type: String, required: true },
  meaning: { type: String, required: true },
  example: String,
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' }
});
module.exports = mongoose.model('Vocabulary', vocabSchema);