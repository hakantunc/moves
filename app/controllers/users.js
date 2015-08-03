'use strict';

var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = {
  login: function (req, res) {
    res.render('login', {

    });
  },
  signup: function (req, res) {
    res.render('users/signup', {

    });
  },
  create: function (req, res) {
    var new_user = new User({username: req.body.username});
    new_user.hashed_pw = new_user.encryptPassword(req.body.password);
    new_user.save(function (err) {
      res.redirect('/');
    });
  }
};
