'use strict';

var LocalStrategy = require('passport-local').Strategy;

module.exports = function (passport, config) {

  passport.serializeUser(function(user, done) {
    done(null, user);
    // done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    done(null, id);
    // User.findById(id, function(err, user) {
    //   done(err, user);
    // });
  });

  passport.use(new LocalStrategy(
    function(username, password, done) {
      return done(null, username);
      // User.findOne({ username: username }, function (err, user) {
      //   if (err) { return done(err); }
      //   if (!user) {
      //     return done(null, false, { message: 'Incorrect username.' });
      //   }
      //   if (!user.validPassword(password)) {
      //     return done(null, false, { message: 'Incorrect password.' });
      //   }
      //   return done(null, user);
      // });
    }
  ));

};
