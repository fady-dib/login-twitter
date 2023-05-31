const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  twitterId: String,
  twitchId: String,
});

module.exports = mongoose.model('User', UserSchema);
