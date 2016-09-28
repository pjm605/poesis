
app.service('MainFactory', function ($http, $log) {

	return {
		getResult: function (from, to) {
			return $http.get('/api/result/?dName=' + from + "&oName=" + to)
		},
        getStops: function (location) {
          return $http.get('/api/result/activity/' + location)
        }
	}
});
