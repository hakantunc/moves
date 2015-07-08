'use strict';

var DateTime = require('./DateTime');

function Commute () { }

Commute.prototype.getCommuteList = function (data) {
  var list = [];
  var curr_item = {};
  var commuting = false;

  debugger;
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
    if (commuting) {
      commuting = false;
      curr_item.to = segment;
      list.push(curr_item);
    }
    curr_item = {};
    curr_item.from = segment;
  }

  function handleMove() {
    if (!commuting) {
      commuting = true;
      curr_item.commutes = curr_item.commutes || [];
      curr_item.commutes.push(segment);
    }
  }
};

Commute.prototype.commuteList = function (data) {

  var list = [];
  var curr_item = [];
  var commuting = false;
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
    if (commuting) {
      commuting = false;
      curr_item.push(curr_place);
      list.push(curr_item);
    }
    curr_item = [curr_place];
  }

  function handleMove() {
    if (!commuting) {
      commuting = true;
      if (curr_item.length === 1) {
        curr_item.push(dt.getDiff(segment.endTime, segment.startTime));
      }
    }
  }

};

module.exports = Commute;
