const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlatformSchema = new Schema({

  platform: String,
  games: [{
    game: String
  }]

});

module.exports = mongoose.model('Platform', PlatformSchema);