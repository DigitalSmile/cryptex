angular.module('popupCloseManager', [])
    .factory('PopupCloseManager', function () {
        var manager =
        {
            set: {},
            addCloseHandler:function (key, popup) {
                manager.set[key] = popup;
            },
            getCloseHandler:function (key) {
                return manager.set[key];
            },
            removeCloseHandler: function(key) {
                delete(manager.set[key]);
            }
        }
        return manager;
    });
