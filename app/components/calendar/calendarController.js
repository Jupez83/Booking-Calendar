var moment=require('moment');

module.exports = function($scope, $state, $stateParams, calendarService) {

  $scope.calendarId = $stateParams.calendarId;
  $scope.calendar = {};
  $scope.calendarEvents = [];

  calendarService.getCalendar($scope.calendarId).then(function(data) {
    $scope.calendar = _.get(data, 'data', {});
    if (_.has($scope.calendar, 'events')) {
      $scope.calendar.events.forEach(function(data) {
        $scope.calendarEvents.push(convertEvent(data));
      });
    }
  });

  $scope.showAddEvent = false;
  $scope.toggleAddEvent = function(events) {
    $scope.events = events;
    $scope.showAddEvent = !$scope.showAddEvent;
  };

  $scope.cancel = function(){
    $scope.showAddEvent = false;
  };

  $scope.addCalendarEvent = function(data) {
    var startDateTime = makeDatetime(data.startDate, data.startTime);
    var endDateTime = makeDatetime(data.endDate, data.endTime);

    var eventData = {};
    eventData.title = data.title;
    eventData.start = startDateTime;
    if (endDateTime !== null) {
      eventData.end = endDateTime;
    }

    calendarService.addCalendarEvent($scope.calendarId, eventData).then(function(data) {
      if (data.status === 'OK') {
        $scope.calendarEvents.push(convertEvent(eventData));
      }

      $scope.toggleAddEvent();
    });
  };

  $scope.deleteCalendar = function() {
    calendarService.deleteCalendar($scope.calendarId).then(function(data) {
      $scope.$emit('calendarListChanged', {calendarId: $scope.calendarId});
    });
  };

  function convertEvent(data) {
    var eventData = {};

    for (var key in data) {
      if (key === 'start' || key === 'end') {
        if (moment(data[key]).isValid()) {
          eventData[key] = moment(data[key]).format('YYYY-MM-DDTHH:mm:ss').replace('T00:00:00','');
        }
      } else if (key.charAt(0) !== '_') {
        eventData[key] = data[key];
      }
    }

    return eventData;
  }

  function makeDatetime(date, time) {
    var tmpDate = '';
    var tmpTime = 'T00:00:00';

    if (date && moment(date).isValid()) {
      tmpDate = moment(date).format('YYYY-MM-DD');

      if (time && moment(time).isValid()) {
        tmpTime = moment(time).format('THH:mm:ss');
      }

      return moment(tmpDate + tmpTime).toDate();
    }

    return null;
  }

  $scope.dayClickHandler = function(data) {
    console.log("dayClickHandler", data);

    var events = {};
    events.startDate = data.toDate();
    $scope.toggleAddEvent(events);
  };

  $scope.eventClickHandler = function(data) {
    console.log("eventClickHandler", data);
  };
};
