'use strict';

var DateTime = require('./DateTime');

function Travel () { }

Travel.prototype.travelList = function (data) {

  var list = [];
  var curr_item = [];
  var traveling = false;
  var dt = new DateTime();

  for (var segment of data.segments) {
    switch(segment.type) {
      case 'place':
        handlePlace();
        break;
      case 'move':
        handleMove();
        break;
    }
  }

  return list;

  function handlePlace() {
    if (traveling) {
      curr_item.push(segment.place.name);
      list.push(curr_item);
    } else {
      curr_item = [segment.place.name];
    }
  }

  function handleMove() {
    if (traveling) {

    } else {
      traveling = true;
      if (curr_item.length === 1) {
        curr_item.push(dt.getDiff(segment.endTime, segment.startTime));
      }
    }
  }

};

module.exports = Travel;
