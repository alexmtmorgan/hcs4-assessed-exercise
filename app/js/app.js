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

            .state('introduction', {
                url: '/level0',
                templateUrl: 'app/www/introduction.html'
            })

            .state('level1', {
                url: '/level1',
                templateUrl: 'app/www/level_1.html'
            })

            ;

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/dashboard');
    });