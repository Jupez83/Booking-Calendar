var express = require('express');
var userDb = require('./userdb');
var router = express.Router();

console.log('ddd');

router.post('/login', function(req, res) {
  console.log('login');
  userDb.login(req, res);
});

router.post('/register', function(req, res) {
  console.log('register');
  userDb.register(req, res);
});

router.get('/status', function(req, res) {
  console.log('status');
  if (req.session.username) {
    console.log("logged in");
    res.send({status:'LOGGED_IN'});
  } else {
    console.log("not logged in");
    res.send({status:'NOT_LOGGED_IN'});
  }
});

module.exports = router;
