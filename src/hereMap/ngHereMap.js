angular.module('ngHereMap', [
    'hereMapsApi'
])

.directive('ngHereMap', function(hereMapsApi) {
    return {
        restrict: 'E',
        scope: {
            latitude: '=',
            longitude: '=',
            zoom: '=?',
            traffic: '=?',
            onMapInit: '&' // this will call parent controller's method
        },
        replace: true,
        transclude: true,
        template:
        '<div class="map">' +
        '    <div class="map-jsla"></div>' +
        '    <div class="map-controls" ng-transclude></div>' +
        '</div>',
        controller: function($scope) {
            var ctrl = this;

            ctrl.getMap = function() {
                return $scope.getMap();
            };
        },
        link: function(scope, element) {

            var map;

            scope.getMapComponents = function() {
                return [
                    // ZoomBar provides a UI to zoom the map in & out
                    new hereMapsApi.maps.map.component.ZoomBar(),
                    // Creates UI to easily switch between street map satellite and terrain mapview modes
                    new hereMapsApi.maps.map.component.TypeSelector(),
                    // Creates a toggle button to show/hide traffic information on the map
                    new hereMapsApi.maps.map.component.Traffic(),
                    // We add the behavior component to allow panning / zooming of the map
                    new hereMapsApi.maps.map.component.Behavior()
                ];
            };

            scope.createMap = function(node, components, defaultParams) {

                var baseMapType = defaultParams.traffic ?
                    hereMapsApi.maps.map.Display.TRAFFIC : hereMapsApi.maps.map.Display.NORMAL;

                return new hereMapsApi.maps.map.Display(node, {
                    // initial center and zoom level of the map
                    view: {
                        latitude: defaultParams.latitude,
                        longitude: defaultParams.longitude,
                        zoom: defaultParams.zoom || 10
                    },
                    baseMapType: baseMapType,
                    fixedCenter: false,
                    components: components
                });
            };

            scope.getMap = function() {
                return map;
            };

            map = scope.createMap(element.children()[0], scope.getMapComponents(), {
                latitude: scope.latitude,
                longitude: scope.longitude,
                zoom: scope.zoom,
                traffic: scope.traffic
            });

            map.addListener('displayready', function() {
                scope.displayReady = true;
                // passes the map to the root controller
                scope.onMapInit({map: map});
            });
        }
    };
});
