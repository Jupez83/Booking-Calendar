var caldb = require('./database').Calendar;
var eventdb = require('./database').Event;

var STATUS_SUCCEED        = 'OK';
var STATUS_FAILED         = 'FAILED';

var generateRes = function(status, info) {
  var msg = info && info.message ? info.message : null;
  return {status: status, message: msg};
};

exports.getAllCalendars = function(req, res) {
  if (!req.isAuthenticated()) {
    res.send(generateRes(STATUS_FAILED));
    return;
  }

  var query = {users: {$in: [req.user._id]}};

  caldb.find(query).populate('events').exec(function(err, data) {
    if (err) {
      res.send(generateRes(STATUS_FAILED, err));
    } else {
      res.send({data: data});
    }
  });
};

exports.getCalendar = function(req, res) {
  if (!req.isAuthenticated()) {
    res.send(generateRes(STATUS_FAILED));
    return;
  }

  var cal_id = req.params.calendar_id;
  var query = {$and: [{_id: cal_id}, {users: {$in: [req.user._id]}}]};

  caldb.findOne(query).populate('events').exec(function(err, data) {
    if (err) {
      res.send(generateRes(STATUS_FAILED, err));
    } else {
      res.send({data: data});
    }
  });
};

exports.addCalendar = function(req, res) {
  if (!req.isAuthenticated()) {
    res.send(generateRes(STATUS_FAILED));
    return;
  }

  var temp = new caldb(req.body);
  temp.users.push(req.user._id);
  temp.save(function(err) {
    if (err) {
      res.send(generateRes(STATUS_FAILED, err));
    } else {
      res.send(generateRes(STATUS_SUCCEED));
    }
  });
};

exports.updateCalendar = function(req, res) {
  if (!req.isAuthenticated()) {
    res.send(generateRes(STATUS_FAILED));
    return;
  }

  var cal_id = req.params.calendar_id;
  var query = {$and: [{_id: cal_id}, {users: {$in: [req.user._id]}}]};

  caldb.update(query, {title:req.body.title}, function(err) {
    if (err) {
      res.send(generateRes(STATUS_FAILED, err));
    } else {
      res.send(generateRes(STATUS_SUCCEED));
    }
  });
};

exports.deleteCalendar = function(req, res) {
  if (!req.isAuthenticated()) {
    res.send(generateRes(STATUS_FAILED));
    return;
  }

  var cal_id = req.params.calendar_id;
  var query = {$and: [{_id: cal_id}, {users: {$in: [req.user._id]}}]};

  caldb.remove(query, function(err) {
    if (err) {
      res.send(generateRes(STATUS_FAILED, err));
    } else {
      res.send(generateRes(STATUS_SUCCEED));
    }
  });
};

exports.getAllCalendarEvents = function(req, res) {
  if (!req.isAuthenticated()) {
    res.send(generateRes(STATUS_FAILED));
    return;
  }

  var cal_id = req.params.calendar_id;
  var query = {$and: [{_id: cal_id}, {users: {$in: [req.user._id]}}]};

  caldb.findOne(query).populate('events').exec(function(err, data) {
    if (err) {
      res.send(generateRes(STATUS_FAILED, err));
    } else if (data === null) {
      res.send({events: {}});
    } else {
      res.send({events: data.events});
    }
  });
};

exports.getCalendarEvent = function(req, res) {
  if (!req.isAuthenticated()) {
    res.send(generateRes(STATUS_FAILED));
    return;
  }

  var cal_id = req.params.calendar_id;
  var event_id = req.params.event_id;
  var query = {$and: [{_id: cal_id}, {users: {$in: [req.user._id]}}, {events: {$in: [event_id]}}]};

  caldb.findOne(query).populate('events').exec(function(err, data) {
    if (err) {
      res.send(generateRes(STATUS_FAILED, err));
    } else if (data === null) {
      res.send({events: {}});
    } else {
      var eventData = {};
      data.events.forEach(function(entry) {
        if (entry._id == event_id) {
          eventData = entry;
        }
      });
      res.send({events: eventData});
    }
  });
};

exports.addCalendarEvent = function(req, res) {
  if (!req.isAuthenticated()) {
    res.send(generateRes(STATUS_FAILED));
    return;
  }

  var temp = new eventdb(req.body);
  temp.save(function(err) {
    if (err) {
      res.send(generateRes(STATUS_FAILED, err));
    } else {
      var cal_id = req.params.calendar_id;
      var query = {$and: [{_id: cal_id}, {users: {$in: [req.user._id]}}]};

      caldb.update(query, {$push:{'events':temp._id}}, function(err) {
        if (err) {
          res.send(generateRes(STATUS_FAILED, err));
        } else {
          res.send(generateRes(STATUS_SUCCEED));
        }
      });
    }
  });
};

exports.updateCalendarEvent = function(req, res) {
  if (!req.isAuthenticated()) {
    res.send(generateRes(STATUS_FAILED));
    return;
  }

  var cal_id = req.params.calendar_id;
  var event_id = req.params.event_id;
  var query = {$and: [{_id: cal_id}, {users: {$in: [req.user._id]}}, {events: {$in: [event_id]}}]};

  caldb.findOne(query, function(err, data) {
    if (err) {
      res.send(generateRes(STATUS_FAILED, err));
    } else if (data === null) {
      res.send(generateRes(STATUS_FAILED));
    } else {
      var temp = new eventdb(req.body);
      eventdb.findOneAndUpdate({_id: event_id}, req.body, function(err) {
        if (err) {
          res.send(generateRes(STATUS_FAILED, err));
        } else {
          res.send(generateRes(STATUS_SUCCEED));
        }
      });
    }
  });
};

exports.deleteCalendarEvent = function(req, res) {
  if (!req.isAuthenticated()) {
    res.send(generateRes(STATUS_FAILED));
    return;
  }

  var cal_id = req.params.calendar_id;
  var event_id = req.params.event_id;
  var query = {$and: [{_id: cal_id}, {users: {$in: [req.user._id]}}]};

  caldb.findOneAndUpdate(query, {$pull: { 'events': event_id}}, function(err, data) {
    if (err || data === null) {
      res.send(generateRes(STATUS_FAILED, err));
    } else {
      eventdb.remove({_id: event_id}, function(err) {
        if (err) {
          res.send(generateRes(STATUS_FAILED, err));
        } else {
          res.send(generateRes(STATUS_SUCCEED));
        }
      });
    }
  });
};
