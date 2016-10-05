app.factory('parse', function($http) {
    var dictionary = $http.get('/api/lexicon/cmudictionary')
        .then(function(response) {
            return response.data;
        });
    return function(word) {
        return dictionary.then(function(dict) {
            if (dict[word]) return dict[word];
            else return '@' + word;
        })
    }
});
