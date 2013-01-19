angular
    .module('userService', [])
    .factory('User', function () {

        var user = {
            email: '',

            addEmail: function(email) {
                this.email = email;
            },
            checkUser: function() {
                return this.email != '';
            }
        }
        return user;
});
