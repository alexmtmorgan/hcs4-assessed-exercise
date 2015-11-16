/**
 * Created by alexmtmorgan on 12/11/2015.
 */

angular.module('app', ['ui.bootstrap', 'ui.router', 'ngRoute', 'app.controllers'])

    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('dashboard', {
                url: '/dashboard',
                templateUrl: 'app/www/dashboard.html'
            })

            .state('information', {
                url: '/information',
                templateUrl: 'app/www/information.html'
            })

            .state('level1', {
                url: '/level1',
                templateUrl: 'app/www/level1.html'
            })

            .state('level1.nameInput', {
                url: '',
                templateUrl: 'app/www/nameInput.html'
            })

            .state('levelTemplate', {
                url: '/leveltemplate',
                templateUrl: 'app/www/level_template.html'
            });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/dashboard');
    });