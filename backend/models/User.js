const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: String,
  password: String,
  email: String,
  mygames: [
    {
      game: String,
      platform: String,
      ownership: String,
      status: String,
      boxart: String,
      progressnotes: [
        {
          description: String
        }
      ]
    }
  ]
});

module.exports = mongoose.model('User', UserSchema);