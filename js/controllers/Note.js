function NoteController($scope, $location, $route, UserManager, PopupCloseManager, NoteRequestBuilder, NotesManager) {
    $scope.notesActive = "active";
    $scope.noteId = $route.current.params.id;
    if (!UserManager.isLoggedIn()) {
        var t = "/login/?backUrl=" + $location.path().replace("/", "");
        $location.url(t);
        return;
    }
    $scope.decrypted = false;
    $scope.note = {
        id:$scope.noteId,
        showCancel:true,
        getNote:function (id, pass, keep) {
            NotesManager.add(id, pass, keep);
            $scope.loadNote();
            PopupCloseManager.getCloseHandler('decrypt')();
        }
    };

    $scope.loadNote = function () {
        NoteRequestBuilder.getNote({user:UserManager.getEmail(), note:$scope.noteId}, function (result) {
            var note = NotesManager.get(result.id);
            if (!note.getKeepNote()) {
                NotesManager.remove(note.id);
            }
            try {
                $scope.headerTitle = result.title;
                $scope.text = CryptoJS.AES.decrypt(result.text, note.getCredentials()).toString(CryptoJS.enc.Utf8);
                $scope.decrypted = true;
            } catch (e) {
                $scope.headerTitle = "Access Denied";
                $scope.$broadcast('alert', 'alert-error', 'Access Denied!', 'Seems you have entered incorrect pass phrase or key');
            }
        }, function (error) {

        });
    }

    $scope.isExists = function (id) {
        return NotesManager.isExists(id);
    }

    $scope.isDecrypted = function (id) {
        return NotesManager.isDecrypted(id);
    }

    if (NotesManager.isExists($scope.noteId)) {
        $scope.loadNote();
    } else {
        $scope.immidiate = true;
    }
}