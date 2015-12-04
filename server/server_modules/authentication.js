var router = require('express').Router();
var userdb = require('./userdb.js');
var passport = require('passport');

var COOKIE_MAX_AGE        = 14 * 24 * 60 * 60 * 1000; // 14 days
var STATUS_SUCCEED        = 'OK';
var STATUS_FAILED         = 'FAILED';

var generateRes = function(status, info) {
  var msg = info && info.message ? info.message : null;
  return {status: status, message: msg};
};

/* Handle login requests */
router.post('/login', function(req, res) {
  console.log('login');

  passport.authenticate('local', function(err, user, info) {
    if (err && !user) {
      return res.send(generateRes(STATUS_FAILED, info));
    }

    req.logIn(user, function(err) {
      if (err) {
        return res.send(generateRes(STATUS_FAILED, info));
      }

      if (req.body.remember) {
        req.session.cookie.maxAge = COOKIE_MAX_AGE;
      } else {
        req.session.cookie.expires = false;
      }

      return res.send(generateRes(STATUS_SUCCEED));
    });
  })(req, res);
});

/* Handle registeration requests */
router.post('/register', function(req, res) {
  console.log('/register');

  var user = new userdb.User(req.body);
  user.save(function(err) {
    if (err) {
      res.send({status: STATUS_FAILED});
    } else {
      res.send({status: STATUS_SUCCEED});
    }
  });
});

/* Handle status requests */
router.get('/status', function(req, res) {
  console.log('/status');

  if (req.isAuthenticated()) {
    res.send({authoricated: true});
  } else {
    res.send({authoricated: false});
  }
});

module.exports = router;
