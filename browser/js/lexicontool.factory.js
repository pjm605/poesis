app.factory('lexicon', function($http) {

  var fromLexiconTool = $http.get('/api/dictionary/buffer')
                    .then(function(response) {
                      return response.data;
                    });

  return function (input) {
    return fromLexiconTool.then(function (result) {
      return result; //an array of pronunciations
    })
  }
});

app.factory('sendToLexicon', function($http) {

  var toLexiconTool = $http.post('/api/dictionary/buffer', data)
                    .then(function(response) {
                      return response.data;
                    });

  return function (data) {
    return toLexiconTool.then(function (result) {
      return result; //an array of pronunciations
    })
  }
});
