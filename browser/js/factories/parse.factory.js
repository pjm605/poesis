app.factory('parseFactory', function($http) {
  var dictionary = $http.get('/api/lexicon/cmudictionary')
    .then(function(response) {
      return response.data;
    });

  return {
    fromDictionary: function(word) {
      return dictionary.then(function(dict) {
        if (dict[word]) return dict[word];
        else return '@' + word;
      });
    }
  }
});
