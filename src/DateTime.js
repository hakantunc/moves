'use strict';

var moment = require('moment');
var format = "YYYYMMDDTHHmmssZ";

function DateTime () { }

DateTime.prototype.getDiff = function (a, b) {
  return moment(a, format).diff(moment(b, format)) / 1000;
};

module.exports = DateTime;
