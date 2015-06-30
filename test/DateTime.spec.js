'use strict';

var assert = require('assert');
var DateTime = require('../src/DateTime');

describe('DateTime', function () {

  var dt = new DateTime();

  describe('#getDiff()', function () {

    it('should be equal', function () {
      assert.equal(386, dt.getDiff("20150603T100101-0500", "20150603T095435-0500"));
    });

  });
});
