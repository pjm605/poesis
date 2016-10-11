app.factory('parseWordsFactory', function (meterToken, meterFactory, rhymeToken, soundToken, lexiconFactory, parseFactory) {

  return function(words) {
    var parsedWords = [];
    var fromLexicon;
    var hapaxWords = [];
    for (var idx = 0; idx < words.length; idx++) {
      parsedWords.push(parseFactory.fromDictionary(words[idx]));
    }

    return Promise.all(parsedWords).then(function (parseArray) {
      for (var i = 0; i < parseArray.length; i++) {
        if (parseArray[i][0] === '@') {
          hapaxWords.push(parseArray[i].slice(1));
        }
      }
      console.log('Not in the dictionary: ', hapaxWords);
      if (hapaxWords.length > 0) {
        hapaxWords = hapaxWords.join('\n');
        return lexiconFactory.fromLexiconServer(hapaxWords)
        .then(function(lexiconParseArray) {
          fromLexicon = lexiconParseArray;
          for (var j = 0; j < parseArray.length; j++) {
            if (parseArray[j][0] === '@') {
              parseArray[j] = fromLexicon.shift();
            }
          } return parseArray
        });
      }
      return parseArray;
    })
    .catch(function (err) {
      console.error('error', err);
    });
  }
});
