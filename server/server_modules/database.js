var mongoose = require('mongoose');

var MONGO_URL = 'mongodb://localhost:27017/booking_db';

mongoose.connect(MONGO_URL, function(err) {
  if (err) {
    console.log('Not connected ' + err);
  } else {
    console.log('Connected');
  }
});

var User = mongoose.model('user', {
  username: {type: String, required: true},
  password: {type: String, required: true},
});

exports.User = User;
