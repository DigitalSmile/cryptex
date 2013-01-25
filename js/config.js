angular.module('Main',
    [
        'alertDirective',
        'popoverDirective',
        'identiconsDirective',
        'popupDirective',


        'userService',
        'requestBuilderService',
        'popupCloseManager',
        'notesManager'
    ],
    function ($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(true);


        $routeProvider.when('/about/', {
            templateUrl:'/templates/about.html',
            controller: AboutController
            }).when('/notes/', {
                templateUrl:'/templates/notes-list.html',
                controller: NotesController
            }).when('/notes/:id/', {
                templateUrl:'/templates/note.html',
                controller: NoteController
            }).when('/notes/add/', {
                templateUrl:'/templates/notes-add.html'
            }).when('/login/', {
                templateUrl:'/templates/login.html',
                controller: LoginController
            }).otherwise({redirectTo:'/about'});
    });


