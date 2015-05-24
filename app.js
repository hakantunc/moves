'use strict';

var debug = require('debug')('moves:app');
var express = require('express');
var session = require('express-session');
var path = require('path');
var url = require('url');
var request = require('request');
var auth = require('./auth');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(session({
  secret: 'moves',
  resave: false,
  saveUninitialized: true
}));

app.get('/', function (req, res) {
  if (!req.session.access_token) {
    res.redirect(auth.authorization_uri);
  } else {
    res.render('index', { 
      title: 'Home',
      content: 'Moves App'
    });
  }
});

app.use('/auth', auth.router);

app.get('/places', function (req, res) {
  var site = 'https://api.moves-app.com/';
  var request_path = '/api/1.1/user/places/daily?pastDays=3&access_token=' + req.session.access_token;
  var full_path = url.resolve(site, request_path);
  // we get the json data.
  request(full_path, function (err, response, body) {
    res.render('places', {
      title: 'Places',
      json: body
    });
  });
});

app.use(function (req, res, next) {
  var err = new Error('Page not found');
  debug('reqq', req, 'ress', res);
  err.status = 404;
  next(err);
});

var server = app.listen(3000, function () {
  var port = server.address().port;
  console.log('Moves app listening at port: %s', port);
});
