angular.module('popupDirective', [])
    .directive('popup', function ($parse, $compile, $location, PopupCloseManager) {
    return function (scope, element, attrs) {

        var showCon = $parse(attrs.show);
        var show = showCon(scope, {});

        scope.$watch(function () {
            return showCon(scope, {});
        }, function (value) {
            show = value;
        });

        if (attrs.close) {
            $(element).on('click', function () {
                PopupCloseManager.getCloseHandler(attrs.close)();
            });
        }

        $(element).on('click', function () {

            if (typeof(show) == 'undefined' || show == false) {
                var popupScope = scope.$new(true);
                if (typeof(attrs.data) != 'undefined') {
                    var data = $parse(attrs.data);
                    popupScope.data = data(scope, {});
                }
                var body = $compile('<div ng-include="\'' + attrs.popup + '\'"></div>')(popupScope);

                var dialog = $(body).dialog({
                    width: (attrs.popupwidth ? attrs.popupwidth : 380),
                    modal:true,
                    resizable:false,
                    position:{ my:"center", at:"center"},
                    close:function () {
                        $(this).dialog('destroy');
                            if (typeof(show) != 'undefined') {
                                if (show == true) {
                                    if (element.attr('ng-href')) {
                                        $location.path(element.attr('ng-href'));
                                    } else if (element.attr('click')) {
                                        var funcName = element.attr('click');
                                        scope[funcName]();
                                    }
                                }
                            }
                    },
                    zIndex:1490
                });

                PopupCloseManager.addCloseHandler(attrs.popupid, function () {
                    dialog.dialog('close');
                    PopupCloseManager.removeCloseHandler(attrs.popupid);
                });

                popupScope.$apply();
                return false;
            }
            ;
        });
    }
});
