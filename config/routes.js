'use strict';

var path = require('path');

module.exports = function (app, config, passport) {
  
  var ctrls_p = path.join(config.root, 'app/controllers');
  
  var users = require(path.join(ctrls_p, 'users'));
  app.get('/login', users.login);
  app.post('/login',
    passport.authenticate(
      'local',
      {
        successRedirect: '/',
        failureRedirect: '/login'
      }
    )
  );
  app.get('/logout', users.logout);
  app.get('/signup', users.signup);
  app.post('/users', users.create);
  app.get('/auth', users.auth);
  app.get('/auth/moves/callback', users.save_token);

  var home = require(path.join(ctrls_p, 'home'));
  app.get('/', home.index);

};
