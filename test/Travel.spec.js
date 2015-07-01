'use strict';

var assert = require('assert');
var Travel = require('../src/Travel');

describe('Travel', function () {

  var travel = new Travel();

  describe('#travelList()', function () {

    var simple_storyline = require('./data/simple_storyline');
    var storyline = require('./data/storyline');

    it('should be equal', function () {
      var simple_storyline_travel_list = [
        [ {id: 1, name: 'A'}, 386, {id: 2, name: 'B'} ]
      ];
      assert.deepEqual(simple_storyline_travel_list, travel.travelList(simple_storyline));
    });

    it('should be equal', function () {
      var storyline_travel_list = [
        [ {id: 1, name: undefined }, 1907, {id: 2, name: undefined } ],
        [ {id: 2, name: undefined }, 384, {id: 4, name: 'test' } ],
        [ {id: 4, name: 'test' }, 359, {id: 2, name: undefined } ],
        [ {id: 2, name: undefined }, 1866, {id: 1, name: undefined } ]
      ];
      assert.deepEqual(storyline_travel_list, travel.travelList(storyline));
    });

  });
});
