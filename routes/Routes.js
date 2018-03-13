'use strict';
module.exports = function(app) {
  var con = require('../controllers/Controller');

  // todoList Routes
  app.route('/api/users/:name')
    .get(con.findUser)
    .delete(con.deleteUser);

  app.route('/api/users')
    .get(con.showUsers)
    .post(con.addUser);

  app.route('/api/group/rec?')
    .get(con.recommend);

  app.route('/api/songs')
    .post(con.addSong);

  app.route('/api/likematch')
    .post(con.likeMatch);

  app.route('/api/unlikematch')
  .post(con.unLikeMatch);


};
