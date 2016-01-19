module.exports = function($resource) {
  var factory = {};

  factory.getAllCalendars = function() {
    console.log("getAllCalendars");
    var req = $resource('/calendar', {}, {});
    return req.query().$promise;
  };

  factory.getCalendar = function(calId) {
    console.log("getCalendar", calId);
    var req = $resource('/calendar/:calendarId', {calendarId: calId}, {});
    return req.get().$promise;
  };

  factory.addCalendar = function(calData) {
    console.log("addCalendar", calData);
    var req = $resource('/calendar', {}, {'post': {method:'POST'}});
    return req.post(calData).$promise;
  };

  factory.updateCalendar = function(calId, calData) {
    console.log("updateCalendar", calId, calData);
    var req = $resource('/calendar/:calendarId', {calendarId: calId}, {'put':{method:'PUT'}});
    return req.put(calData).$promise;
  };

  factory.deleteCalendar = function(calId) {
    console.log("deleteCalendar", calId);
    var req = $resource('/calendar/:calendarId', {calendarId: calId}, {'delete':{method:'DELETE'}});
    return req.delete().$promise;
  };

  factory.getAllCalendarEvents = function(calId) {
    console.log("getAllCalendarEvents", calId);
    var req = $resource('/calendar/:calendarId/events', {calendarId: calId}, {});
    return req.get().$promise;
  };

  factory.getCalendarEvent = function(calId, eventId) {
    console.log("getCalendarEvent", calId, eventId);
    var req = $resource('/calendar/:calendarId/events/:eventId', {calendarId: calId, eventId: eventId}, {});
    return req.get().$promise;
  };

  factory.addCalendarEvent = function(calId, eventData) {
    console.log("addCalendarEvent", calId, eventData);
    var req = $resource('/calendar/:calendarId/events', {calendarId: calId}, {'post': {method:'POST'}});
    return req.post(eventData).$promise;
  };

  factory.updateCalendarEvent = function(calId, eventId, eventData) {
    console.log("updateCalendarEvent", calId, eventId, eventData);
    var req = $resource('/calendar/:calendarId/events/:eventId', {calendarId: calId, eventId: eventId}, {'put':{method:'PUT'}});
    return req.put(eventData).$promise;
  };

  factory.deleteCalendarEvent = function(calId, eventId) {
    console.log("deleteCalendarEvent", calId, eventId);
    var req = $resource('/calendar/:calendarId/events/:eventId', {calendarId:calId, eventId:eventId}, {'delete':{method:'DELETE'}});
    return req.delete().$promise;
  };

  return factory;
};
