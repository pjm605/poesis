app.factory('parseWordsFactory', function(meterToken, meterFactory, rhymeToken, soundToken, lines, lexicon, parse) {

  var parsedWords = [];
  var hapaxWords = [];
  var fromLexicon = null;
  var lineArray;

  return function(words) {
    for (var idx = 0; idx < words.length; idx++) {
      parsedWords.push(parse(words[idx]));
    }

    return Promise.all(parsedWords).then(function (parseArray) {
      for (var i = 0; i < parseArray.length; i++) {
        if (parseArray[i][0] === '@') {
          hapaxWords.push(parseArray[i].slice(1));
        }
      }
      console.log('Not in the dictionary: hapaxWords', hapaxWords);
      if (hapaxWords.length > 0) {
        hapaxWords = hapaxWords.join('\n');
        return lexicon(hapaxWords)
        .then(function(lexiconParseArray) {
          fromLexicon = lexiconParseArray;
          for (var j = 0; j < parseArray.length; j++) {
            if (parseArray[j][0] === '@') {
              parseArray[j] = fromLexicon.shift();
            }
          }
          lineArray =  lines(parseArray);
        });

      } else {
        lineArray =  lines(parseArray);
      }
      return lineArray;
    })
    .catch(function (err) {
      console.error('error', err);
    });

  }
});
