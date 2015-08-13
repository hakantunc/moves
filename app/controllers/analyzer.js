'use strict';

var auth = require('../../src/auth');
var analyze = require('../../src/analyze');
var url = require('url');
var request = require('request');

var Commute = require('../../src/Commute');
var t = new Commute();

module.exports = {
  places: function (req, res) {
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
  },

  commutes: function (req, res) {
    auth.get_access_token(req, function (err, access_token) {
      var site = 'https://api.moves-app.com/';
      var request_path = '/api/1.1/user/storyline/daily?pastDays=28&access_token=' + access_token;
      var full_path = url.resolve(site, request_path);
      // we get the json data.
      request(full_path, function (err, response, body) {
        if (body === 'expired_access_token') {
          return res.redirect('/');
        }
        else {
          var result = t.getCommuteList(JSON.parse(body));
          // res.send(result);
          res.render('commutes', {
            title: 'Commutes',
            commute_list: result
          });
        }
      });
    });
  }
};
