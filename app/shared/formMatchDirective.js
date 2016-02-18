module.exports = function() {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function(scope, element, attrs, ctrl) {
      function matchValidator(value) {
        scope.$watch(attrs.match, function(newValue) {
          var isValid = value === newValue;
          ctrl.$setValidity('match', isValid);
        });

        return value;
      }

      ctrl.$parsers.push(matchValidator);
    }
  };
};
