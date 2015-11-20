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

module.exports = router;
