angular.module('services.hereMapsApi', [])

.factory('hereMapsApi', function($window, config) {
    var jsla = $window.nokia;
    return jsla;
});
