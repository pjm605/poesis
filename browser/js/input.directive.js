app.directive('onSpace', function () {
  return {
    restrict: 'A',
  }
  // adapting this code --> not my own
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.myEnter);
                });

                event.preventDefault();
            }
        });
    };
});
