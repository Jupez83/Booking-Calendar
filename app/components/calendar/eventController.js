var moment=require('moment');

module.exports = function ($scope, $uibModalInstance, $stateParams, events, calendarService) {
  $scope.calendarId = $stateParams.calendarId;
  $scope.events = events;

  $scope.addEvent = function(data) {
    var startDateTime = makeDatetime(data.startDate, data.startTime);
    var endDateTime = makeDatetime(data.endDate, data.endTime);

    var eventData = {};
    eventData.title = data.title;
    eventData.backgroundColor = data.backgroundColor;
    eventData.textColor = data.textColor;
    eventData.start = startDateTime;
    if (endDateTime !== null) {
      eventData.end = endDateTime;
    }

    calendarService.addCalendarEvent($scope.calendarId, eventData).then(function(data) {
      var rsp = {};
      rsp.action = 'post';
      rsp.status = data.status;
      eventData.eventId = _.get(data, '_id');
      console.log("eventData.eventId", eventData.eventId);
      rsp.eventId = eventData.eventId;
      rsp.eventData = eventData;
      $uibModalInstance.close(rsp);
    });
  };

  $scope.updateEvent = function(data) {
    var startDateTime = makeDatetime(data.startDate, data.startTime);
    var endDateTime = makeDatetime(data.endDate, data.endTime);

    var eventData = {};
    eventData.title = data.title;
    eventData.backgroundColor = data.backgroundColor;
    eventData.textColor = data.textColor;
    eventData.start = startDateTime;
    if (endDateTime !== null) {
      eventData.end = endDateTime;
    }

    eventData.eventId = data.eventId;
    calendarService.updateCalendarEvent($scope.calendarId, eventData.eventId, eventData).then(function(data) {
      var rsp = {};
      rsp.action = 'put';
      rsp.status = data.status;
      rsp.eventId = eventData.eventId;
      rsp.eventData = eventData;
      $uibModalInstance.close(rsp);
    });
  };

  $scope.deleteEvent = function(data) {
    var eventData = {};
    eventData.eventId = data.eventId;
    calendarService.deleteCalendarEvent($scope.calendarId, eventData.eventId).then(function(data){
      var rsp = {};
      rsp.action = 'delete';
      rsp.status = data.status;
      rsp.eventId = eventData.eventId;
      $uibModalInstance.close(rsp);
    });
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };

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
};
