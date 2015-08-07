


// app.controller('MapsCtrl',['$scope', function ($scope) {    //<-- please note the first '$scope'

//     angular.extend($scope, {
//         center: {
//             latitude: 0, // initial map center latitude
//             longitude: 0, // initial map center longitude
//         },
//         markers: [], // an array of markers,
//         zoom: 8, // the zoom level
//     });
// }]);


app.controller('MapsCtrl',function MapsCtrl ($scope){
	$scope.map = {
		center: {
			latitude: 37.79,
			longitude: -122.4175
		},
		zoom: 13
	};

	// uiGmapGoogleMapApi.then(function(maps) {
	// 	console.log('made it')
	// });
});


app.directive('map', function ($state) {
	return {
		restrict: 'E',
		scope: {},
		controller: 'MapsCtrl',
		templateUrl: 'js/common/directives/map/map.html'
		// link: function (scope) {

		// }
	}
})