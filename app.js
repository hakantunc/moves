'use strict';

var debug = require('debug')('moves:app');
var express = require('express');
var session = require('express-session');
var app = express();

app.use(session({
  secret: 'moves',
  resave: false,
  saveUninitialized: true
}));

app.get('/', function (req, res) {
  if (!req.session.access_token) {
    res.send('no token');
  } else {
    res.send('moves');
  }
});

app.use(function (req, res, next) {
  var err = new Error('Page not found');
  err.status = 404;
  next(err);
});

var server = app.listen(3000, function () {
  var port = server.address().port;
  console.log('Moves app listening at port: %s', port);
});
