function LoginController($scope, $route, $location, UserManager, UserRequestBuilder) {
    $scope.headerTitle = "Start working with Crypto Notes";
    $scope.backUrl = $route.current.params.backUrl;
    $scope.user = {};

    $scope.signIn = function () {
        if (!$scope.user.email) {
            $scope.$broadcast('alert', 'alert-error', 'Error!', 'The email is empty, you should provide email!');
            return;
        }
        var hash = CryptoJS.enc.Hex.stringify(CryptoJS.SHA1($scope.user.email));

        UserRequestBuilder.login({user:hash}, function (result) {
            if ($scope.user.keep) {
                UserManager.setIsKeeped(true);
            }
            UserManager.login(hash);
            $location.search({});
            if (result.id) {
                // we have that guy
                if (result.key) {
                    //looks like nerd with key

                } else {
                    //simple auth no key
                    $location.path($scope.backUrl);
                }
            } else {
                //new to us
                //console.log(data.id);
            }
        }, function (error) {

        });


    }

}