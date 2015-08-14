'use strict';

var mongoose = require('mongoose');
var User = mongoose.model('User');
var auth = require('../../src/auth');

module.exports = {
  login: function (req, res) {
    res.render('login', {
    });
  },

  logout: function (req, res) {
    req.session.passport = {};
    res.redirect('/');
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
  },

  auth: function (req, res) {
    res.redirect(auth.authorization_uri(req.headers.host, /Mobi/.test(req.headers['user-agent'])));
  },

  save_token: function (req, res) {
    var user = req.user;
    auth.get_token(req, function (err, token) {
      if (!user) {
        req.session.access_token = token.access_token;
        res.redirect('/');
      } else {
        user.updateMoves(token, function (err) {
          res.redirect('/');
        });
      }
    });
  }

};
