angular.module('app.services', ['ng'])

    .factory('SharedService', [function() {

        var username = null;

        return {
            getUsername: function () {
                return username;
            },
            setUsername: function(name) {
                username = name;
            }
        };
    }]);