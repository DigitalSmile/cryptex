function NotesController($scope, $location, User) {
/*    if (!User.checkUser()) {
        var t = "/login/?backUrl=" + $location.path().replace("/","");
        $location.url(t);
    }*/
    $scope.headerTitle = "My Notes";
    $scope.notesActive = "active";
    $scope.notes = {};

    $scope.isDecrypted = function(hash) {
        return false;
    }


    for (i = 0; i < 100; i++) {
        $scope.notes[i] = {};
        var hash = CryptoJS.SHA1(new Date().toDateString() + CryptoJS.lib.WordArray.random(16));
        $scope.notes[i] .sha = CryptoJS.enc.Hex.stringify(hash);
    }

    //generateIdenticons();

}