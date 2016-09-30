app.factory('countSounds', function () {
  // input will be ['AH', 'B', 'SS', 'OH']
      return function (word) {
      var newWord = word.replace(/[^A-Za-z ]+/g, '');
      newWord = newWord.split(" ");
      var soundDic = {};
      for (var i = 0; i < newWord.length; i++) {
        if(soundDic.hasOwnProperty(newWord[i]) === false) soundDic[newWord[i]] = 1;
        else soundDic[newWord[i]] += 1;
      }
      return soundDic;
  };
});
