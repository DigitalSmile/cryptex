function NotesController($scope, $location, UserManager, NotesRequestBuilder, NotesManager, PopupCloseManager) {
    if (!UserManager.isLoggedIn()) {
        var t = "/login/?backUrl=" + $location.path().replace("/", "");
        $location.url(t);
        return;
    }
    $scope.headerTitle = "My Notes";
    $scope.notesActive = "active";
    $scope.notes = {};

    $scope.isDecrypted = function (id) {
        return NotesManager.get(id) != null;
    }

    NotesRequestBuilder.getNotes({user:UserManager.getEmail()},function (data) {
        $scope.notes = data;
        angular.forEach($scope.notes, function (value, key) {
            $scope.notes[key].getNote = function (id, pass, keep) {
                NotesManager.add(id, pass, keep);
                PopupCloseManager.getCloseHandler('decrypt')();
            };
        });
    }, function (error) {
    });


    /*    for (i = 0; i < 6; i++) {
     $scope.notes[i] = {};
     var hash = CryptoJS.SHA1(new Date().toDateString() + CryptoJS.lib.WordArray.random(16));
     $scope.notes[i] .sha = CryptoJS.enc.Hex.stringify(hash);
     }*/

}