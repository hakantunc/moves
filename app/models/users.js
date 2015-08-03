'use strict';

var mongoose = require('mongoose');
var crypto = require('crypto');
var salt = 'saline';

var userSchema = mongoose.Schema({
    username: String,
    hashed_pw: String
});

userSchema.methods.validPassword = function (password) {
  return this.encryptPassword(password) === this.hashed_pw;
};

userSchema.methods.encryptPassword = function (password) {
  return crypto.createHmac('sha1', salt).update(password).digest('hex');
};

var User = mongoose.model('User', userSchema);
