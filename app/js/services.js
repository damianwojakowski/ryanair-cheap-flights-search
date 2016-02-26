'use strict';

var cheapFlightsServices = angular.module('cheapFlightsServices', ['ngResource']);

cheapFlightsServices.factory('FlightsSettings',
    function () {
        var settings = {
            language: "eng",
            cities: null
        };

        return settings;
    }
);