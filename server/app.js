var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');

var database = require('./server_modules/database');
var auth = require('./server_modules/authentication');

var PUBLIC_DIR = '../app';

var app = express();

//This middleware creates an session object in client requests
//and generates session cookie for user (so you can reference
//req.session)
app.use(session({secret:'yoursecrettokenhere'}));

app.use(express.static(path.join(__dirname, PUBLIC_DIR)));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use('/auth', auth);

app.listen(3000);
