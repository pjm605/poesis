app.factory('soundsFactory', function () {
  var soundDic = {};
  return {
      countWordSounds: function (word) {
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
        // input: { AH: 3, JH: 1, UW: 1, D: 1, K: 1, EY: 1, SH: 1, N: 1 }
        // output: ["AH"]
        var significantN = 0
        var significant = ""
        for (var key in sounds) {
          if(sounds[key] > significantN) {
            significantN = sounds[key]
            significant = key
          }
        }
        return [significant];
      }
    };
});

//
// app.factory('countSounds', function () {
//   // input will be ['AH', 'B', 'SS', 'OH']
//   var countSounds = {};
//
//   var soundDic = {};
//   countSounds.count = function (word) {
//     var newWord = word.replace(/[^A-Za-z ]+/g, '');
//     newWord = newWord.split(" ");
//
//     for (var i = 0; i < newWord.length; i++) {
//       if (soundDic.hasOwnProperty(newWord[i]) === false) soundDic[newWord[i]] = 1;
//       else soundDic[newWord[i]] += 1;
//     }
//     return soundDic;
//   };
//
//
//   return countSounds;
//
// });
