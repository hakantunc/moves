'use strict';

var debug = require('debug')('moves:auth');
var express = require('express');
var router = express.Router();
var url = require('url');

var oauth2 = require('simple-oauth2')({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  site: 'https://api.moves-app.com',
  authorizationPath: '/oauth/v1/authorize',
  mobileAuthorizationUri: 'moves://app/authorize',
  tokenPath: '/oauth/v1/access_token'
});

var get_redirect_uri = function (host) {
  return url.format({protocol: 'http', host: host, pathname: '/auth/moves/callback'});
};

var authorization_uri = function (host, is_mobile) {
  return oauth2.authCode.authorizeURL({
    redirect_uri: get_redirect_uri(host),
    scope: 'activity location'
  }, is_mobile);
};

router.get('/moves/callback', function(req, res, next) {
  var code = req.query.code;
  oauth2.authCode.getToken({
    redirect_uri: get_redirect_uri(req.headers.host),
    code: code
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
