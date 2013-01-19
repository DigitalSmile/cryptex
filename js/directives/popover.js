angular.module('dropdownDirective', [])
    .directive('dropdown', function () {
        return function (scope, element) {
            $(element).dropdown();
        }
    });
