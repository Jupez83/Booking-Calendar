var moment=require('moment');

module.exports = function($scope, calendarService) {

  $scope.getAllCalendars = function() {
    calendarService.getAllCalendars().then(function(data){
      console.log("returned", data);
    });
  };

  $scope.getCalendar = function(calId) {
    calendarService.getCalendar(calId).then(function(data){
      console.log("returned", data);
    });
  };

  $scope.addCalendar = function(calTitle) {
    var calData = {
      title: calTitle,
    };

    calendarService.addCalendar(calData).then(function(data){
      console.log("returned", data);
    });
  };

  $scope.updateCalendar = function(calId, calTitle) {
    var calData = {
      title: calTitle,
    };

    calendarService.updateCalendar(calId, calData).then(function(data){
      console.log("returned", data);
    });
  };

  $scope.deleteCalendar = function(calId) {
    calendarService.deleteCalendar(calId).then(function(data){
      console.log("returned", data);
    });
  };

  $scope.getAllCalendarEvents = function(calId) {
    calendarService.getAllCalendarEvents(calId).then(function(data){
      console.log("returned", data);
    });
  };

  $scope.getCalendarEvent = function(calId, eventId) {
    calendarService.getCalendarEvent(calId, eventId).then(function(data){
      console.log("returned", data);
    });
  };

  $scope.addCalendarEvent = function(calId, eventTitle, eventStart, eventStop) {
    var eventData = {
      title: eventTitle,
      start: eventStart,
      end: eventStop
    };

    calendarService.addCalendarEvent(calId, eventData).then(function(data){
      console.log("returned", data);
    });
  };

  $scope.updateCalendarEvent = function(calId, eventId, eventTitle, eventStart, eventStop) {
    var eventData = {
      title: eventTitle,
      start: eventStart,
      end: eventStop
    };

    calendarService.updateCalendarEvent(calId, eventId, eventData).then(function(data){
      console.log("returned", data);
    });
  };

  $scope.deleteCalendarEvent = function(calId, eventId) {
    calendarService.deleteCalendarEvent(calId, eventId).then(function(data){
      console.log("returned", data);
    });
  };
};
