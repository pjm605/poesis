app.factory('soundsFactory', function () {
  var soundDic = {};
  return {
      countSounds: function (word) {
        var newWord = word.replace(/[^A-Za-z ]+/g, '');
        newWord = newWord.split(" ");
        for (var i = 0; i < newWord.length; i++) {
          if(soundDic.hasOwnProperty(newWord[i]) === false) soundDic[newWord[i]] = 1;
          else soundDic[newWord[i]] += 1;
        }
      },
      getSoundDic: function () {
        return soundDic;
      },
      identifySignificant: function (sounds) {
        /*
          takes in an object containing the counts of all the sounds throughout
          the poem, and returns an array of significant sounds
        */
        //TODO
        return
      }
    };
});
