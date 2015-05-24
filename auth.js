'use strict';

var debug = require('debug')('moves:auth');
var express = require('express');
var router = express.Router();

var oauth2 = require('simple-oauth2')({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  site: 'https://api.moves-app.com',
  authorizationPath: '/oauth/v1/authorize',
  tokenPath: '/oauth/v1/access_token'
});

var authorization_uri = oauth2.authCode.authorizeURL({
  redirect_uri: 'http://localhost:3000/auth/moves/callback',
  scope: 'activity location'
});

router.get('/moves/callback', function(req, res, next) {
  var code = req.query.code;
  oauth2.authCode.getToken({
    code: code,
    redirect_uri: 'http://localhost:3000/auth/moves/callback'
  }, saveToken);

  function saveToken(error, result) {
    if (error) { debug('Access Token Error', error); }
    var token = oauth2.accessToken.create(result);
    req.session.access_token = token.token.access_token;
    res.redirect('/');
  }
});

module.exports = {
  authorization_uri: authorization_uri,
  oauth2: oauth2,
  router: router
};
