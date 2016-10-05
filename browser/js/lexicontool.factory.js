app.factory('lexicon', function($http) {
	return function(data) {
		return $http.post('/api/lexicon', {words: data}).then(function(response) {
			return response.data;
		});
    };
});
