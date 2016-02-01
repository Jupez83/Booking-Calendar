var router = require('express').Router();
var auth = require('./authentication');
var calendar = require('./calendar');

//************ REST API for authentication **************//

router.post('/auth/login', function(req, res) {
  auth.login(req, res);
});

router.post('/auth/register', function(req, res) {
  auth.register(req, res);
});

router.get('/auth/status', function(req, res) {
  auth.authStatus(req, res);
});

router.get('/user', function(req, res) {
  auth.getUser(req, res);
});

router.put('/user', function(req, res) {
  auth.updateUser(req, res);
});

router.delete('/user', function(req, res) {
  auth.deleteUser(req, res);
});

//************ REST API for calendar handlers **************//

router.get('/calendar', function(req, res) {
  calendar.getAllCalendars(req, res);
});

router.get('/calendar/:calendar_id', function(req, res) {
  calendar.getCalendar(req, res);
});

router.post('/calendar', function(req, res) {
  calendar.addCalendar(req, res);
});

router.put('/calendar/:calendar_id', function(req, res) {
  calendar.updateCalendar(req, res);
});

router.delete('/calendar/:calendar_id', function(req, res) {
  calendar.deleteCalendar(req, res);
});

router.get('/calendar/:calendar_id/events', function(req, res) {
  calendar.getAllCalendarEvents(req, res);
});

router.get('/calendar/:calendar_id/events/:event_id', function(req, res) {
  calendar.getCalendarEvent(req, res);
});

router.post('/calendar/:calendar_id/events', function(req, res) {
  calendar.addCalendarEvent(req, res);
});

router.put('/calendar/:calendar_id/events/:event_id', function(req, res) {
  calendar.updateCalendarEvent(req, res);
});

router.delete('/calendar/:calendar_id/events/:event_id', function(req, res) {
  calendar.deleteCalendarEvent(req, res);
});

module.exports = router;
