app.factory('parse', function($http) {
  getDictionary = function() {
    return $http.get('/api/dictionary')
    .then(function(response) {
      return response.data;
    });
  }
  return function (word) {
    
  }
});
