app.factory('soundFactory', function () {

  var countWordSounds = function (word, soundDic) {
    var newWord = word.replace(/[^A-Za-z ]+/g, '');
    newWord = newWord.split(' ');
    for (var i = 0; i < newWord.length; i++) {
      if (soundDic.hasOwnProperty(newWord[i]) === false) soundDic[newWord[i]] = 1;
      else soundDic[newWord[i]] += 1;
    }
  };

  //helper function we do not want to expose
  var countTextSounds = function (text) {
    var sd = {};
    console.log('text', text);
    for (var i = 0; i < text.length; i++) {
      countWordSounds(text[i], sd);
    }
    return sd
  };

  var normalize = function (counts) {
    console.log('normalize called');
    var total = 0;
    for (var k in counts) {
      total += counts[k];
    }
    for (var key in counts) {
      counts[key] = counts[key] * 1.0 / total;
    }
    return counts;
  }

  return {
    //the text which is input should be an array of arrays of
    //phonetically parsed words
    identifySignificant: function (text) {
      var counts = countTextSounds(text);
      var nor = normalize(counts);
      console.log(n);
      //average = n;
      // input: { AH: 3, JH: 1, UW: 1, D: 1, K: 1, EY: 1, SH: 1, N: 1 }
      // output: ["AH"]
      var significantN = 0.1;
      var significant = [];
      for (var key in nor) {
        console.log(key, nor[key], significantN)
        if (nor[key] > significantN) {
          significant.push(key);
        }
      }
      console.log('significant', significant);
      return significant;
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
