app.factory('lexiconFactory', function($http) {
	return {
		fromLexiconServer: function(data) {
			return $http.post('/api/lexicon', { words: data }).then(function(response) {
				return response.data;
			});
		}
	}
});
