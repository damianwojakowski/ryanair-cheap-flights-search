'use strict';

var cheapFlights = angular.module('cheapFlightsApp', [
    'ngRoute',

    'cheapFlightsControllers',
    'cheapFlightsFilters',
    'cheapFlightsServices',
    'angucomplete-alt',
    '720kb.datepicker'
]);

cheapFlights.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/cheap-flights/search', {
                templateUrl: 'partials/search-box.html',
                controller: 'cheapFlightsSearchCtrl'
            }).otherwise({
                redirectTo: '/cheap-flights/search'
            });
    }
]);
