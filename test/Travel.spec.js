'use strict';

var Travel = require('../src/Travel');
var assert = require('assert');

var simple_storyline = require('./data/simple_storyline');
var storyline = require('./data/storyline');

describe('Travel', function () {

  var travel = new Travel();

  describe('#getTravelList()', function () {
    var ss_get_travel_list = [
      {
        from: simple_storyline[0].segments[0],
        to: simple_storyline[0].segments[2],
        travels: [
          simple_storyline[0].segments[1]
        ]
      }
    ];
    it('should be equal', function () {
      assert.deepEqual(
        ss_get_travel_list,
        travel.getTravelList(simple_storyline)
      );
    });
  });

  describe('#travelList()', function () {

    var simple_storyline_travel_list = [
      [ {id: 1, name: 'A'}, 386, {id: 2, name: 'B'} ]
    ];
    var storyline_travel_list = [
      [ {id: 1, name: undefined }, 1907, {id: 2, name: undefined } ],
      [ {id: 2, name: undefined }, 384, {id: 4, name: 'test' } ],
      [ {id: 4, name: 'test' }, 359, {id: 2, name: undefined } ],
      [ {id: 2, name: undefined }, 1866, {id: 1, name: undefined } ]
    ];

    it('should be equal', function () {
      assert.deepEqual(simple_storyline_travel_list, travel.travelList(simple_storyline));
    });

    it('should be equal', function () {
      assert.deepEqual(storyline_travel_list, travel.travelList(storyline));
    });

    var two_day_storyline = storyline.concat(simple_storyline);

    it('should be equal', function () {
      assert.deepEqual(storyline_travel_list.concat(simple_storyline_travel_list), travel.travelList(two_day_storyline));
    });

  });

});
