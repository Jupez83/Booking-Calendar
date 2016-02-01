var userdb = require('./database').User;
var passport = require('passport');

var COOKIE_MAX_AGE        = 14 * 24 * 60 * 60 * 1000; // 14 days
var STATUS_SUCCEED        = 'OK';
var STATUS_FAILED         = 'FAILED';

var generateRes = function(status, info) {
  var msg = info && info.message ? info.message : null;
  return {status: status, message: msg};
};

exports.login = function(req, res) {
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
};

exports.register = function(req, res) {
  console.log('/register');

  var user = new userdb(req.body);
  user.save(function(err) {
    if (err) {
      res.send(generateRes(STATUS_FAILED, err));
    } else {
      res.send(generateRes(STATUS_SUCCEED));
    }
  });
};

exports.authStatus = function(req, res) {
  console.log('/status', req.user);

  if (req.isAuthenticated()) {
    res.send({authoricated: true});
  } else {
    res.send({authoricated: false});
  }
};

exports.getUser = function(req, res) {
  var query = {_id: req.user._id};

  userdb.findOne(query, function(err, data) {
    if (err) {
      res.send(generateRes(STATUS_FAILED, err));
    } else {
      res.send({data: data});
    }
  });
};

exports.updateUser = function(req, res) {
  var query = {_id: req.user._id};

  userdb.findOne(query, function (err, doc){
    for (var key in req.body) {
      doc[key] = req.body[key];
    }

    doc.save(function(err) {
      if (err) {
        res.send(generateRes(STATUS_FAILED, err));
      } else {
        res.send(generateRes(STATUS_SUCCEED));
      }
    });
  });
};

exports.deleteUser = function(req, res) {
  var query = {_id: req.user._id};

  userdb.remove(query, function(err) {
    if (err) {
      res.send(generateRes(STATUS_FAILED, err));
    } else {
      res.send(generateRes(STATUS_SUCCEED));
    }
  });
};
