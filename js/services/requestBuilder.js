angular.module('requestBuilderService', ['ngResource']).
    factory('NotesRequestBuilder', function ($resource) {
        return $resource('/tmp/note-list.json', {}, {
            getNotes:{method:'GET', params: {user:"@user"}},
            getNote:{method:'GET'}
        });
    }).factory('UserRequestBuilder', function ($resource) {
        return $resource('/tmp/users.json', {}, {
            login:{method:'GET', params: {user:"@user"}}
        });
    }).factory('NoteRequestBuilder', function ($resource) {
        return $resource('/tmp/note.json', {}, {
            getNote:{method:'GET', params: {note:"@note", user:"@user"}}
        });
    });