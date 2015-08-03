'use strict';

module.exports = function (app, passport) {
  var users = require('../app/controllers/users');
  app.get('/login', users.login);
  app.post(
    '/login',
    passport.authenticate(
      'local',
      {
        successRedirect: '/',
        failureRedirect: '/login'
      }
    )
  );
  app.get('/signup', users.signup);
  app.post('/users', users.create);
};
