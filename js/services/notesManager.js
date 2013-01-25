angular.module('notesManager', [])
    .factory('NotesManager', function () {

        function Note(id, credentials, keepNote) {
            this.id = id;
            this.credentials = credentials;
            this.keepNote = keepNote;
            this.isInvalidCredentials = false;

            this.setCredentials = function (credentials) {
                this.credentials = credentials;
            }

            this.getCredentials = function () {
                return this.credentials;
            }

            this.getId = function () {
                return this.id;
            }

            this.getKeepNote = function () {
                return this.keepNote;
            }

            this.setIsInvalidCredentials = function (isInvalidCredentials) {
                this.isInvalidCredentials = isInvalidCredentials;
            }

            this.getIsInvalidCredentials = function () {
                return this.isInvalidCredentials;
            }
        }


        var notes =
        {
            notes:{},

            add:function (id, credentials, keep) {
                this.notes[id] = new Note(id, credentials, keep);
            },

            get:function (id) {
                return this.notes[id];
            },
            remove:function (id) {
                delete this.notes[id];
            },
            isExists:function (id) {
                return this.notes[id] != null;
            },
            isDecrypted:function(id) {
                return  this.isExists(id) && this.notes[id].getCredentials() == null;
            }

        }
        return notes;
    });
