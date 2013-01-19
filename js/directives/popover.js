angular.module('popoverDirective', [])
    .directive('popover', function () {
        return function (scope, element, attrs) {
            $(element).popover({
                placement: 'bottom'
            });
        }
    });
