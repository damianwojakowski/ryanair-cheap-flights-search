'use strict';

var cheapFlightsControllers = angular.module('cheapFlightsControllers', []);

cheapFlightsControllers.controller('cheapFlightsSearchCtrl', ['$scope', '$http', 'FlightsSettings',
    function($scope, $http, FlightsSettings) {

        function initialize() {
            updateData();
        }

        $scope.dateChanged = function () {
            console.log("date changed");
            FlightsSettings.dateTo = $scope.dateTo;
            FlightsSettings.dateFrom = $scope.dateFrom;
        };

        $scope.dateTo = "";
        $scope.dateFrom = "";

        $scope.selectedFrom = function (res) {
            console.log("selectedFrom:", res.originalObject.iataCode);
            FlightsSettings.flightFrom = res.originalObject.iataCode;
        };

        $scope.selectedTo = function (res) {
            console.log("selectedTo:", res.originalObject.iataCode);
            FlightsSettings.flightTo = res.originalObject.iataCode;
        };

        $scope.airports = [{"name": "dyn"}, {"name": "dwa"}, {"name": "dupa"}];

        $scope.showFlights = function () {
            var query = buildQuery();
            if (query) {
                updateFlights(query);
            } else {
                wrongInputError();
            }
        };

        $scope.areFlightsAvailable = false;
        $scope.flightsAvailable = [];
        //$scope.flightsAvailable = [{"outbound":{"airportFrom":{"iataCode":"DUB","name":"Dublin"},"airportTo":{"iataCode":"STN","name":"London Stansted"},"price":{"value":19.99,"valueMainUnit":"19","valueFractionalUnit":"99","currencySymbol":"€"},"dateFrom":"2016-02-01T06:30:00.000Z","dateTo":"2016-02-01T07:55:00.000Z"},"summary":{"price":{"value":19.99,"valueMainUnit":"19","valueFractionalUnit":"99","currencySymbol":"€"},"advertText":null,"flightViewUrl":"/en/cheap-flights/dublin-to-london-stansted/?out-date=2016-02-01"}}];

        /**
         * TODO: implement showing messages about wrong input or no input
         */
        function wrongInputError() {
            console.log("Wrong Input Error");
        }

        $scope.setLanguage = function () {
            FlightsSettings.language = "pl";
            updateData();
        };

        $scope.getLanguage = function () {
            return FlightsSettings.language;
        };

        $scope.messages = {};

        function updateData() {
            var language = FlightsSettings.language;

            $http.jsonp('https://www.ryanair.com/' + language +'/api/2/forms/flight-booking-selector/',
                {params: {"callback": "JSON_CALLBACK"}}).then(
                function(response) {
                    $scope.messages = response.data.messages;
                    $scope.airports = response.data.airports;
                }, function (error) {
                    console.log("$http.error:", error);
                });
        }

        function updateFlights(query) {
            $http.jsonp(query,
                {params: {"callback": "JSON_CALLBACK"}}).then(
                function(response) {
                    $scope.flightsAvailable = response.data.flights;
                    $scope.areFlightsAvailable = true;
                }, function (error) {
                    console.log("$http.error:", error);
                    $scope.areFlightsAvailable = false;
                });
        }

        initialize();

        function buildQuery() {
            var language = FlightsSettings.language;

            var flightTo = FlightsSettings.flightTo;
            var flightFrom = FlightsSettings.flightFrom;

            var dateTo =  FlightsSettings.dateTo;
            var dateFrom = FlightsSettings.dateFrom;

            // TODO: Validate input data
            if (language && flightTo && flightFrom && dateTo && dateFrom) {
                var query = 'https://www.ryanair.com/' +  language + '/api/2/flights/from/' + flightFrom + '/to/' +
                    flightTo + '/' + dateFrom + '/' + dateTo + '/250/unique/?limit=15&offset-0';
                console.log("query: ", query);
                return query;
            } else {
                return false;
            }

        }
    }
]);