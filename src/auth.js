'use strict';

var debug = require('debug')('moves:auth');
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

var get_token = function (req, callback) {
  var code = req.query.code;
  oauth2.authCode.getToken({
    redirect_uri: get_redirect_uri(req.headers.host),
    code: code
  }, function (err, result) {
    callback(err, result);
  });
};

var get_access_token = function (req, callback) {
  var user = req.user;
  if (!user) {
    if (req.session.access_token)
      return callback(null, req.session.access_token);
    else return callback('err');
  }
  if (!user.moves.access_token) {
    return callback('err');
  }
  var token = oauth2.accessToken.create({
    access_token: user.moves.access_token,
    refresh_token: user.moves.refresh_token,
    expires_in: Math.floor((user.moves.expires_at - new Date)/1000)
  });
  if (token.expired()) {
    token.refresh(function(error, result) {
      token = result;
      user.updateMoves(token.token, function (err) {
        callback(null, token.token.access_token);
      });
    });
  } else {
    callback(null, token.token.access_token);
  }
};

module.exports = {
  authorization_uri: authorization_uri,
  oauth2: oauth2,
  get_token: get_token,
  get_access_token: get_access_token
};
