angular.module('app.services', ['ng'])

    .factory('SharedService', [function() {

        var username = null;
        var password = null;

        var completedLevels = [false,false,false,false];

        return {
            getUsername: function () {
                return username;
            },
            setUsername: function(name) {
                username = name;
            },

            setInitialPassword: function(pass) {
                password = pass;
            },
            getInitialPassword: function() {
                return password;
            },

            getCompletedLevels: function() {
                return completedLevels;
            },
            setLevelCompleted: function(level) {
                completedLevels[level] = true;
            }
        };
    }]);