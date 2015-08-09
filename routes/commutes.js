'use strict';

var debug = require('debug')('moves:auth');
var router = require('express').Router();
var request = require('request');
var url = require('url');

var Commute = require('../src/Commute');
var t = new Commute();

router.get('/', function (req, res, next) {
  var site = 'https://api.moves-app.com/';
  var request_path = '/api/1.1/user/storyline/daily?pastDays=28&access_token=' + req.user.access_token;

  var full_path = url.resolve(site, request_path);
  // we get the json data.
  request(full_path, function (err, response, body) {
    if (body === 'expired_access_token') {
      return res.redirect('/');
    }
    else {
      var result = t.getCommuteList(JSON.parse(body));
      // res.send(result);
      res.render('commutes', {
        title: 'Commutes',
        commute_list: result
      });
    }
  });
});

module.exports = router;
