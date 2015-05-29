'use strict';

var debug = require('debug')('moves:analyze');

var getPlacesSorted = function (places) {
  places = JSON.parse(places);
  var list = {};
  for (var day of places) {
    var segments = day.segments;
    for (var segment of segments) {
      list[segment.place.name] |= 0;
      list[segment.place.name]++;
    }
  }
  var sorted_list = [];
  for (var key in list) {
    var obj = {};
    obj[key] = list[key];
    sorted_list.push([key, list[key]]);
  }
  return sorted_list.sort(function (a, b) {
    return b[1] - a[1];
  });
};

module.exports = {
  getPlacesSorted: getPlacesSorted
};
