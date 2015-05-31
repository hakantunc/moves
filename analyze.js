'use strict';

var debug = require('debug')('moves:analyze');

var getTime = function (date) {
  return new Date(date.substring(0, 4), date.substring(4, 6) - 1, date.substring(6, 8), date.substring(9, 11), date.substring(11, 13), date.substring(13, 15)).getTime();
};

var parsePlacesData = function (places) {
  places = JSON.parse(places);
  var list = {};
  for (var day of places) {
    for (var segment of day.segments) {
      list[segment.place.name] = list[segment.place.name] || new Array();
      list[segment.place.name].push(
        [day.date, getTime(segment.startTime), getTime(segment.endTime)]
      );
    }
  }
  var sorted_list = [];
  for (var key in list) {
    var obj = {};
    obj[key] = list[key];
    sorted_list.push([key, list[key]]);
  }
  return sorted_list.sort(function (a, b) {
    return b[1].length - a[1].length;
  });
};

var getTimeValue = function (time) {
  time /= 1000;
  var hour = Math.floor(time / 3600);
  var min = Math.floor((time % 3600) / 60);
  var sec = Math.floor(time % 60);
  return [hour, min, sec].map(function (e) {
    return e < 10 ? '0' + e : e;
  }).join(':');
};

var isSameDay = function (a, b) {
  a = new Date(Number(a)).getDate();
  b = new Date(Number(b)).getDate();
  return a === b;
};

var getPlacesSorted = function (places) {
  var sorted_list = parsePlacesData(places);
  return sorted_list.map(function (element) {
    var sum = 0;
    var counted = 0;
    var prev = null;
    var non_unique_visits = 0;
    for (var instance of element[1]) {
      var is_same_day = isSameDay(getTime(instance[0]), instance[1]);
      if (!is_same_day) {
        non_unique_visits++;
      }
      if (prev !== instance[0] && is_same_day) {
        sum += instance[1] - getTime(instance[0]);
        prev = instance[0];
        counted++;
      }
    }
    sum = sum / counted;
    sum = getTimeValue(sum);
    return [element[0], element[1].length - non_unique_visits, sum];
  }).sort(function (a, b) {
    return b[1] - a[1];
  });
};

module.exports = {
  getPlacesSorted: getPlacesSorted
};
