angular.module('alertDirective', [])
    .directive('alert', function () {
        return function (scope, element) {
            scope.$on('alert', function (event, type, header, text) {
                $(element).find("#popover").popover('hide');
                if ($(element).css('display') != 'none')
                    $(element).hide();
                scope.alertType = type;
                scope.alertHeader = header;
                scope.alertText = text;
                if ($(element).css('display') == 'none')
                    $(element).fadeToggle("fast", "linear");
                scope.$apply();
            });
            $(element).find(".close").on('click', function () {
                $(element).fadeToggle('slow', 'linear');
                $(element).find("#popover").popover('hide');
                return false;
            });
        }
    });
