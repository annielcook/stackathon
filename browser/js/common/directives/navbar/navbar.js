app.directive('navbar', function (YelpSearch, $rootScope, AuthService, AUTH_EVENTS, $state) {

	return {
		restrict: 'E',
		scope: {},
		templateUrl: 'js/common/directives/navbar/navbar.html',
		link: function (scope) {
			scope.items = [
				{ label: 'Home', state: 'home' },
				{ label: 'About', state: 'about' },
				{ label: 'Documentation', state: 'docs' },
				{ label: 'Members Only', state: 'membersOnly', auth: true }
			];
			scope.modes = [               
				{ value: "WALKING", name: 'Walking' },
				{ value: "DRIVING", name: 'Driving' },
				{ value: "TRANSIT", name: 'Transit' }, 
				{ value: "BICYCLING", name: 'Bicycling' }
			];
			// scope.modes = [ 'walk', 'run']              

			scope.user = null;

			scope.isLoggedIn = function () {
				return AuthService.isAuthenticated();
			};

			scope.logout = function () {
				AuthService.logout().then(function () {
				   $state.go('home');
				});
			};

			var res = YelpSearch.search();
			console.log('!',res);


			var geocoder;
			var start_latlng;
			var end_latlng;
			//console.log businesses around start
			scope.calcLongLat = function () {
				geocoder = new google.maps.Geocoder();

				geocoder.geocode( { 'address': this.route.start}, function(results, status) {
				  if (status === google.maps.GeocoderStatus.OK) {
					start_latlng = results[0].geometry.location;
					// map.setCenter(results[0].geometry.location);
					// var marker = new google.maps.Marker({
					//     map: map,
					//     position: results[0].geometry.location
					// });

					geocoder.geocode( { 'address': this.route.end}, function(results1, status1) {
					  if (status1 === google.maps.GeocoderStatus.OK) {
						end_latlng = results1[0].geometry.location;
						// map.setCenter(results1[0].geometry.location);
						// var marker = new google.maps.Marker({
						//     map: map,
						//     position: results1[0].geometry.location
						// });
						// var res = YelpSearch.search();
						console.log('start: ', start_latlng);
						console.log('end: ', end_latlng);
					  } else {
						alert("Geocode was not successful for the following reason: " + status);
					  }
					});
				  } else {
					alert("Geocode was not successful for the following reason: " + status);
				  }
				});
			};

			var setUser = function () {
				AuthService.getLoggedInUser().then(function (user) {
					scope.user = user;
				});
			};

			var removeUser = function () {
				scope.user = null;
			};

			setUser();

			$rootScope.$on(AUTH_EVENTS.loginSuccess, setUser);
			$rootScope.$on(AUTH_EVENTS.logoutSuccess, removeUser);
			$rootScope.$on(AUTH_EVENTS.sessionTimeout, removeUser);

		}

	};

});
