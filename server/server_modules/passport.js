var mongoose = require('mongoose');
var userdb = require('./database').User;
var LocalStrategy = require('passport-local').Strategy;

module.exports = function(passport) {
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    userdb.findById(id, function(err, user) {
      done(err, user);
    });
  });

  passport.use(new LocalStrategy({
      usernameField: 'username',
      passwordField: 'password',
    },
    function(username, password, done) {
      userdb.findOne({username: username}, function(err, user) {
        if (err) {
          return done(err);
        }

        if (!user) {
          console.log('ERR, LocalStrategy, user not found');
          return done(null, false, { message: 'Incorrect username.' });
        }

        user.validPassword(password, function(isMatch) {
          if (!isMatch) {
            console.log('ERR, LocalStrategy, incorrect password');
            return done(null, false, { message: 'Incorrect password.' });
          }

          console.log('SUCCESS, LocalStrategy');
          return done(null, user);
        });
      });
    }
  ));
};
