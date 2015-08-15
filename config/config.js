'use strict';

var path = require('path');
var root_path = path.resolve(__dirname, '..');

module.exports = {
  development: {
    db: 'mongodb://localhost/moves',
    root: root_path
  },
  production: {
    db: process.env.MONGOLAB_URI,
    root: root_path
  }
};
