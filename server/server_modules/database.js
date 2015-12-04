var mongoose = require('mongoose');

var MONGO_URL = 'mongodb://localhost:27017/booking_db';

mongoose.connect(MONGO_URL, function(err) {
  if (err) {
    console.log('Not connected ' + err);
  } else {
    console.log('Connected');
  }
});
