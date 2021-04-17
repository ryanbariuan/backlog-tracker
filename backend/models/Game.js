const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GameSchema = new Schema({
  game: String,
  platform: String,
  boxart: String,
  gamereviews: [
    {
      author: String,
      rating: Number,
      review: String
    }
  ]
});

module.exports = mongoose.model('Game', GameSchema);