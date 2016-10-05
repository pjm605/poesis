app.factory('lexicon', function($http) {
  var lexiconObject = {};

  lexiconObject.toLexiconTool = function(data) {
    return $http.post('/api/dictionary/buffer', {'words': data})
            .then(function(response) {
              return $http.get('/api/dictionary/buffer')
                      .then(function(secondResponse) {
                        return secondResponse.data;
                      });
            });
  }
  return lexiconObject;
});
