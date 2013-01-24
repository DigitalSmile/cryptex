function NotesController($scope, $location, UserManager, NotesRequestBuilder, NoteRequestBuilder) {
    if (!UserManager.isLoggedIn()) {
        var t = "/login/?backUrl=" + $location.path().replace("/","");
        $location.url(t);
    }
    $scope.headerTitle = "My Notes";
    $scope.notesActive = "active";
    $scope.notes = {};
    $scope.noteProvider = {}

    $scope.isDecrypted = function(hash) {
        return false;
    }

    NotesRequestBuilder.getNotes(function(data) {
        $scope.notes = data;
    }, function(error) {
    });

    $scope.noteProvider.getNote = function(pass) {
        NoteRequestBuilder.getNote({note:"123"},function(result) {
            console.log(CryptoJS.AES.decrypt(result.text,pass).toString(CryptoJS.enc.Utf8));
        }, function(error) {

        });
    }


/*    for (i = 0; i < 6; i++) {
        $scope.notes[i] = {};
        var hash = CryptoJS.SHA1(new Date().toDateString() + CryptoJS.lib.WordArray.random(16));
        $scope.notes[i] .sha = CryptoJS.enc.Hex.stringify(hash);
    }*/

}