'use strict';

var mongoose = require('mongoose');
var crypto = require('crypto');
var salt = 'saline';

var userSchema = mongoose.Schema({
    username: String,
    hashed_pw: String,
    moves: {
      access_token: String,
      refresh_token: String,
      expires_at: Date
    }
});

userSchema.methods.validPassword = function (password) {
  return this.encryptPassword(password) === this.hashed_pw;
};

userSchema.methods.encryptPassword = function (password) {
  return crypto.createHmac('sha1', salt).update(password).digest('hex');
};

userSchema.methods.updateMoves = function (token, next) {
  this.moves.access_token = token.access_token;
  this.moves.refresh_token = token.refresh_token;
  this.moves.expires_at = (new Date).addSeconds(token.expires_in);
  this.save(next);
};

var User = mongoose.model('User', userSchema);
