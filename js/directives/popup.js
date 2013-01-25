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


            var showPopup = function (needsApply) {
                if (typeof(show) == 'undefined' || show == false) {
                    var popupScope = scope.$new(true);
                    popupScope.cancel = function() {
                        dialog.dialog('close');
                    }
                    if (typeof(attrs.data) != 'undefined') {
                        var data = $parse(attrs.data);
                        popupScope.data = data(scope, {});
                    }
                    var body = $compile('<div ng-include="\'' + attrs.popup + '\'"></div>')(popupScope);

                    var dialog = $(body).dialog({
                        width:(attrs.popupwidth ? attrs.popupwidth : 450),
                        modal:true,
                        resizable:false,
                        dialogClass: 'alert',
                        closeOnEscape: false,
                        position:{ my:"center", at:"center"},
                        close:function () {

                            if (attrs.immidiate) {
                                show = showCon(scope, {});
                                if (typeof(show) != 'undefined') {
                                    if (show == true) {
                                        if (element.attr('click')) {
                                            var funcName = element.attr('click');
                                            scope[funcName]();
                                        }
                                        $(this).dialog('destroy');
                                        $(this).remove();
                                        PopupCloseManager.removeCloseHandler(attrs.popupid);
                                    }
                                }
                            } else {
                                $(this).dialog('destroy');
                                $(this).remove();
                                show = showCon(scope, {});
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
                                PopupCloseManager.removeCloseHandler(attrs.popupid);
                            }
                        },
                        zIndex:1490
                    });

                    PopupCloseManager.addCloseHandler(attrs.popupid, function () {
                        dialog.dialog('close');
                    });
                    if (needsApply) {
                        popupScope.$apply();
                    }
                    return false;
                }
                ;
                return true;
            }

            scope.$watch(function () {
                return attrs.immidiate;
            }, function (value) {
                if (value) {
                    showPopup();
                }
            });

            if (attrs.immidiate) {
                showPopup(false);
            } else {
                $(element).on('click', function () {
                    return showPopup(true);
                });
            }

        }
    });
