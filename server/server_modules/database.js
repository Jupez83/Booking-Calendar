var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var MONGO_URL = 'mongodb://localhost:27017/booking_db';
var SALT_WORK_FACTOR = 10;

mongoose.connect(MONGO_URL, function(err) {
  if (err) {
    console.log('Not connected ' + err);
  } else {
    console.log('Connected');
  }
});

/*
 *  DATABASE SCHEMAS
 */

var UserSchema = new Schema({
  username: {type: String, required: true, index: {unique: true}},
  password: {type: String, required: true},
  firstName: {type: String},
  lastName: {type: String},
  address: {type: String},
  city: {type: String},
  country: {type: String}
});

var eventSchema = new Schema({
  title: {type: String, required: true},
  start: {type: Date, required: true},
  end: {type: Date},
  textColor: {type: String},
  backgroundColor: {type: String}
});

var calendarSchema = new Schema({
  title: {type: String},
  events: [{type: Schema.Types.ObjectId, ref: 'event'}],
  users: [{type: Schema.Types.ObjectId, ref: 'user'}]
});

/*
 *  DATABASE METHODS
 */

UserSchema.pre('save', function(next) {
  var _this = this;

  // only hash the password if it has been modified (or is new)
  if (!_this.isModified('password')) {
    return next();
  }

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) {
      return next(err);
    }

    // hash the password along with our new salt
    bcrypt.hash(_this.password, salt, function(err, hash) {
      if (err) {
        return next(err);
      }

      // override the cleartext password with the hashed one
      _this.password = hash;
      next();
    });
  });
});

UserSchema.methods.validPassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    callback(isMatch);
  });
};

/*
 *  DATABASE MODELS
 */

exports.User = mongoose.model('user', UserSchema);
exports.Event = mongoose.model('event', eventSchema);
exports.Calendar = mongoose.model('calendar', calendarSchema);
