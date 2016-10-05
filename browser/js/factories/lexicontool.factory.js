app.factory('lexicon', function($http) {
  return function(data) {
    return $http.post('/api/lexicon/buffer', {words: data}).then(function(response) {
      return $http.get('/api/lexicon/').then(function(secondResponse) {
        return secondResponse.data;
      });
    });
  }
});
