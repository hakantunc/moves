'use strict';

module.exports = {
  index: function (req, res) {
    var user = req.user;
    var user_id = req.session.passport.user;
    res.render('index', {
      title: 'Home',
      user: user,
      user_id: user_id,
      d: process.env.DEBUG,
      content: 'Moves App'
    });    
  }
};
