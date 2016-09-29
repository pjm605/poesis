app.factory('DictionaryFactory', function($http) {


  return {
    getDictionary: function() {
      return $http.get('/api/dictionary')
      .then(function(response) {
      	return response.data;
      });
    }
  };
});
