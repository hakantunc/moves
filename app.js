'use strict';

var debug = require('debug')('moves:app');
var express = require('express');
var session = require('express-session');
var path = require('path');
var favicon = require('serve-favicon');
var url = require('url');
var request = require('request');
var auth = require('./auth');
var app = express();
var analyze = require('./analyze');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon(__dirname + '/public/favicon.ico'));

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
  get_places_data(req.session.access_token, function (err, data) {
    var sorted_places = analyze.getPlacesSorted(data);
    res.render('places', {
      title: 'Places',
      sorted_places: sorted_places
    });
  });
});

function get_places_data (access_token, next) {
  if (process.env.DEBUG) {
    var pl = require('./temp/places');
    return next(null, JSON.stringify(pl));
  }
  var site = 'https://api.moves-app.com/';
  var request_path = '/api/1.1/user/places/daily?pastDays=28&access_token=' + access_token;
  var full_path = url.resolve(site, request_path);
  // we get the json data.
  request(full_path, function (err, response, body) {
    next(null, body);
  });
}

app.use(function (req, res, next) {
  var err = new Error('Page not found');
  debug('reqq', req, 'ress', res);
  err.status = 404;
  next(err);
});

var server = app.listen((process.env.PORT || 3000), function () {
  var port = server.address().port;
  console.log('Moves app listening at port: %s', port);
});
