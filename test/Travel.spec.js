'use strict';

var assert = require('assert');
var Travel = require('../src/Travel');

describe('Travel', function () {

  var travel = new Travel();

  describe('#travelList()', function () {

    var data = require('./simple_storyline');

    it('should be equal', function () {
      assert.deepEqual([['A', 386, 'B']], travel.travelList(data));
    });

  });
});
