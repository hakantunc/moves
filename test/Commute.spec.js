'use strict';

var Commute = require('../src/Commute');
var assert = require('assert');

var simple_storyline = require('./data/simple_storyline');
var storyline = require('./data/storyline');

describe('Commute', function () {

  var commute = new Commute();

  describe('#getCommuteList()', function () {
    var ss_get_commute_list = [
      {
        from: simple_storyline[0].segments[0],
        to: simple_storyline[0].segments[2],
        commutes: [
          simple_storyline[0].segments[1]
        ]
      }
    ];
    it('should be equal', function () {
      assert.deepEqual(
        ss_get_commute_list,
        commute.getCommuteList(simple_storyline)
      );
    });
  });

  describe('#commuteList()', function () {

    var simple_storyline_commute_list = [
      [ {id: 1, name: 'A'}, 386, {id: 2, name: 'B'} ]
    ];
    var storyline_commute_list = [
      [ {id: 1, name: undefined }, 1907, {id: 2, name: undefined } ],
      [ {id: 2, name: undefined }, 384, {id: 4, name: 'test' } ],
      [ {id: 4, name: 'test' }, 359, {id: 2, name: undefined } ],
      [ {id: 2, name: undefined }, 1866, {id: 1, name: undefined } ]
    ];

    it('should be equal', function () {
      assert.deepEqual(simple_storyline_commute_list, commute.commuteList(simple_storyline));
    });

    it('should be equal', function () {
      assert.deepEqual(storyline_commute_list, commute.commuteList(storyline));
    });

    var two_day_storyline = storyline.concat(simple_storyline);

    it('should be equal', function () {
      assert.deepEqual(storyline_commute_list.concat(simple_storyline_commute_list), commute.commuteList(two_day_storyline));
    });

  });

});
