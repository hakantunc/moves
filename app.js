'use strict';

var debug = require('debug')('moves:app');
var express = require('express');

var url = require('url');
var request = require('request');
var auth = require('./src/auth');
var app = express();
var analyze = require('./src/analyze');

//
var env = 'development';
var path = require('path');
var config = require('./config/config')[env];
var mongoose = require('mongoose');
mongoose.connect(config.db);

require(path.join(config.root, 'app/models/users'));

var passport = require('passport');
require('./config/express')(app, config, passport);
require('./config/passport')(passport);
require('./config/routes')(app, config, passport);

// rest is to be organized

var auth = require('./src/auth');

app.get('/places', function (req, res) {
  auth.get_access_token(req, function (err, access_token) {
    get_places_data(access_token, function (err, data) {
      if (err) {
        debug('err', err);
        res.redirect('/');
      } else {
        var sorted_places = analyze.getPlacesSorted(data);
        res.render('places', {
          title: 'Places',
          sorted_places: sorted_places
        });
      }
    });
  });
});

app.use('/commutes', require('./routes/commutes'));

function get_places_data (access_token, next) {
  var site = 'https://api.moves-app.com/';
  var request_path = '/api/1.1/user/places/daily?pastDays=28&access_token=' + access_token;
  var full_path = url.resolve(site, request_path);
  // we get the json data.
  request(full_path, function (err, response, body) {
    if (body === 'expired_access_token')
      next(body);
    else
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
