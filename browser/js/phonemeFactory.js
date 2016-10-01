app.factory('PhonemeFactory', function () {
//what is this??
  return {
    getPhonemeCount: function (word, dictionary) {
      var phonemes = dictionary[word.toLowerCase()];
      if (/\d/gi.test(word)){
        return phonemes[1].match(/(\d)/gi).length;
      }
      return null;
    }
  };

});
