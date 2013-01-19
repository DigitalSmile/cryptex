function NotesController($scope, $location, User) {
/*    if (!User.checkUser()) {
        var t = "/login/?backUrl=" + $location.path().replace("/","");
        $location.url(t);
    }*/
    $scope.headerTitle = "My Notes";
    $scope.notesActive = "active";


    generateIdenticons();

}