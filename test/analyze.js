'use strict';

var debug = require('debug')('moves:test:analyze');
var analyze = require('../analyze');
var data = require('../temp/places');

var sorted_places = analyze.getPlacesSorted(JSON.stringify(data));
console.log(sorted_places);
