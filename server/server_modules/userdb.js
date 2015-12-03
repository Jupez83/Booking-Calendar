var db = require('./database');

exports.login = function(req, res) {
  db.User.findOne({username: req.body.username, password: req.body.password}, function(err, data) {
    if (err) {
      res.send({status:err});
    } else {
      if (data) {
        req.session.username = data.username;
        res.send({status:'OK'});
      } else {
        res.send({status:'FAILED'});
      }
    }
  });
};

exports.register = function(req, res) {
  var user = new db.User(req.body);
  user.save(function(err) {
    if (err) {
      res.send({status:'FAILED'});
    } else {
      res.send({status:'OK'});
    }
  });
};
