angular
    .module('userService', [])
    .factory('UserManager', function () {

        var user = {
            email:'',
            keep:false,

            login:function (email) {
                this.email = email;
            },
            isLoggedIn:function () {
                return this.email != '';
            },
            setIsKeeped:function (keep) {
                this.keep = keep;
            },
            isKeeped:function () {
                return this.keep;
            }
        }
        return user;
    });
