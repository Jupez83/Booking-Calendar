module.exports = function($scope) {

  initCalendar();

  function initCalendar() {
    console.log("init calendar");

    $('#calendar').fullCalendar({
        // put your options and callbacks here
    });
  }
};
