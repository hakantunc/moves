'use strict';

var DateTime = require('./DateTime');

function Travel () { }

Travel.prototype.getTravelList = function (data) {
  var list = [];
  var curr_item = {};
  var traveling = false;

  for (var i = 0; i < data.length; i++) {
    for (var segment of data[i].segments) {
      switch(segment.type) {
        case 'place':
          handlePlace();
          break;
        case 'move':
          handleMove();
          break;
      }
    }
  }

  return list;

  function handlePlace() {
    if (traveling) {
      traveling = false;
      curr_item.to = segment;
      list.push(curr_item);
    }
    curr_item = {};
    curr_item.from = segment;
  }

  function handleMove() {
    if (!traveling) {
      traveling = true;
      curr_item.travels = curr_item.travels || [];
      curr_item.travels.push(segment);
    }
  }
};

Travel.prototype.travelList = function (data) {

  var list = [];
  var curr_item = [];
  var traveling = false;
  var dt = new DateTime();

  for (var i = 0; i < data.length; i++) {
    for (var segment of data[i].segments) {
      switch(segment.type) {
        case 'place':
          handlePlace();
          break;
        case 'move':
          handleMove();
          break;
      }
    }
  }

  return list;

  function handlePlace() {
    var curr_place = {
      name: segment.place.name,
      id: segment.place.id
    };
    if (traveling) {
      traveling = false;
      curr_item.push(curr_place);
      list.push(curr_item);
    }
    curr_item = [curr_place];
  }

  function handleMove() {
    if (!traveling) {
      traveling = true;
      if (curr_item.length === 1) {
        curr_item.push(dt.getDiff(segment.endTime, segment.startTime));
      }
    }
  }

};

module.exports = Travel;
