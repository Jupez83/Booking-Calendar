var moment=require('moment');

module.exports = function($scope, $state, $stateParams, $uibModal, calendarService) {
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

  $scope.deleteCalendar = function() {
    calendarService.deleteCalendar($scope.calendarId).then(function(data) {
      $scope.$emit('calendarListChanged', {calendarId: $scope.calendarId});
    });
  };

  $scope.dayClickHandler = function(data) {
    console.log("dayClickHandler", data);

    var events = {};
    events.startDate = data.toDate();
    $scope.openEventDialog(events);
  };

  $scope.eventClickHandler = function(data) {
    console.log("eventClickHandler", data);

    var events = {};
    var tmpTime;

    events.editMode = true;
    events.eventId = data.eventId;
    events.title = data.title;

    if (moment(data.start).isValid()) {
      events.startDate = data.start.toDate();
      tmpTime = moment(data.start).format('THH:mm:ss');
      if (tmpTime !== 'T00:00:00') {
        events.startTime = data.start.toDate();
      }
    }

    if (moment(data.end).isValid()) {
      events.endDate = data.end.toDate();
      tmpTime = moment(data.end).format('THH:mm:ss');
      if (tmpTime !== 'T00:00:00') {
        events.endTime = data.end.toDate();
      }
    }

    $scope.openEventDialog(events);
  };

  $scope.openEventDialog = function(data) {

    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: 'components/calendar/eventDialog.html',
      controller: 'eventController',
      resolve: {
        events: function () {
          return data;
        }
      }
    });

    modalInstance.result.then(function(data) {
      var index;

      console.log("eventDialog", data);

      switch(data.action) {
        case 'post':
          if (data.status === 'OK') {
            $scope.calendarEvents.push(convertEvent(data.eventData));
            $scope.$broadcast('alertSuccessMsg', 'Event added successfully!');
          } else {
            $scope.$broadcast('alertDangerMsg', 'Unexpected error occurred during saving event!');
          }
          break;
        case 'put':
          if (data.status === 'OK') {
            index = _.findIndex($scope.calendarEvents, {'eventId': data.eventId});
            if (index >= 0) {
              $scope.calendarEvents[index] = convertEvent(data.eventData);
              $scope.$broadcast('alertSuccessMsg', 'Event updated successfully!');
            }
          } else {
            $scope.$broadcast('alertDangerMsg', 'Unexpected error occurred during updating event!');
          }
          break;
        case 'delete':
          if (data.status === 'OK') {
            index = _.findIndex($scope.calendarEvents, {'eventId': data.eventId});
            if (index >= 0) {
              $scope.calendarEvents.splice(index, 1);
              $scope.$broadcast('alertSuccessMsg', 'Event deleted successfully!');
            }
          } else {
            $scope.$broadcast('alertDangerMsg', 'Unexpected error occurred during deleting event!');
          }
          break;
      }
    });
  };

  function convertEvent(data) {
    var eventData = {};

    for (var key in data) {
      if (key === 'start' || key === 'end') {
        if (moment(data[key]).isValid()) {
          eventData[key] = moment(data[key]).format('YYYY-MM-DDTHH:mm:ss').replace('T00:00:00','');
        }
      } else if (key === '_id') {
        var eventId = 'eventId';
        eventData[eventId] = data[key];
      } else {
        eventData[key] = data[key];
      }
    }

    return eventData;
  }
};
