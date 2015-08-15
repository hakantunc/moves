'use strict';

var debug = require('debug')('moves:app');
var path = require('path');

var env = process.env.ENV || 'development';
var config = require('./config/config')[env];

var mongoose = require('mongoose');
mongoose.connect(config.db);
require(path.join(config.root, 'app/models/users'));

var express = require('express');
var app = express();
var passport = require('passport');
require('./config/express')(app, config, passport);
require('./config/passport')(passport);
require('./config/routes')(app, config, passport);

app.use(function (req, res, next) {
  res.render(path.join(config.root, 'app/views/404'));
});

var server = app.listen((process.env.PORT || 3000), function () {
  var port = server.address().port;
  console.log('Moves app listening at port: %s', port);
});
