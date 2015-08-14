'use strict';

module.exports = {
  index: function (req, res) {
    var user = process.env.DEBUG ? req.user : '';
    res.render('index', {
      title: 'Home',
      content: 'Moves App',
      signed_in: !!req.user,
      d: process.env.DEBUG,
      user: user
    });    
  }
};
