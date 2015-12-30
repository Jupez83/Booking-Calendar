var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
var passport = require('passport');
var uuid = require('node-uuid');

var auth = require('./server_modules/authentication');

var PUBLIC_DIR = '../app';
var MODULES_DIR = '../node_modules';

var SECRET_TOKEN = uuid.v4();

var app = express();

require('./server_modules/passport')(passport);
app.use(session({secret: SECRET_TOKEN}));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, PUBLIC_DIR)));
app.use('/modules', express.static(path.join(__dirname, MODULES_DIR)));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use('/auth', auth);

app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

app.listen(3000);
