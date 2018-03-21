'use strict';
module.exports = function(app) {
  var con = require('../controllers/Controller');
  var passport = require('passport');
  var LocalStrategy = require('passport-localapikey').Strategy;

  passport.use(new LocalStrategy(
    function(apikey, done) {
      //function to verify api key
      con.verifykey(apikey, function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        return done(null, user);
      });
    }
  ));

  var auth = passport.authenticate('localapikey', { session: false,failureRedirect: '/api/unauthorized' });


  // todoList Routes
  app.route('/api/users/:id')
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

  app.route('/api/testauth')
  .post(auth,con.showUsers);

  app.route('/api/unauthorized')
  .get(function(req,res) {
    res.json({message: "get outta here!"})
  });


};
