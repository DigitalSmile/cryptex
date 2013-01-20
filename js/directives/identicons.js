angular.module('identiconsDirective', [])
    .directive('identicon', function () {
        return function (scope, element) {
            scope.$watch(function() {
                return $(element).attr('data-identicon');
            }, function(value) {
                if (value) {
                    generateIdenticons(element);
                }
            });
        }
    });
