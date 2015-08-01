'use strict';

var path = require('path');
var wiredep = require('wiredep');
var favicon = require('serve-favicon');
var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');

module.exports = function (app, config, passport) {
  // view engine setup
  app.set('views', path.join(config.root, 'views'));
  app.set('view engine', 'jade');
  wiredep({src: path.join(config.root, 'views/layout.jade')});

  app.use(favicon(path.join(config.root, '/public/favicon.ico')));
  app.use('/public', express.static(path.join(config.root, 'public')));
  app.use('/bower_components', express.static(path.join(config.root, '/bower_components')));

  app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

  app.use(session({
    secret: 'moves',
    resave: false,
    saveUninitialized: true
  }));

  app.use(passport.initialize());
  app.use(passport.session());

};
