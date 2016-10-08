
app.factory('rhymeFactory', function () {

  var isVowel = function (str) {
    if (/\d/.test(str[str.length -1 ])) return true;
    else return false;
  };

  function findVowelLocation (parseSound) {
    var word = parseSound.split(" ");
    var vowelStore = [];
      for (var i = 0; i < word.length; i++) {
        if (isVowel(word[i])) {
          vowelStore.push(word[i].replace(/[^A-Za-z]/,""));
        };
      }
    if(!vowelStore.length) return 0
    else return vowelStore.length - 1
  };

  function findLastVolAndCon (parseSound) {
    var word = parseSound.join('').split(" ");
    var lastVowel = "";
    var consonants = [];
    var buffer = 0;
    for (var i = 0; i < word.length; i++) {
      if (isVowel(word[i])) {
        lastVowel = word[i].replace(/[^A-Za-z ]+/g, ''); 
        buffer = i;
      }
    }

    for (var k = buffer+1; k < word.length; k++) {
      consonants.push(word[k]);
    }
  
    return [parseSound.length -1,lastVowel, consonants];
    //return [index,'AH', ['L']]
  };

  function findMatch(breakLines) {
    var lastWord =[]
    for (var i = 0; i < breakLines.length; i++) {
      lastWord.push(findLastVolAndCon(breakLines[i]))
    }
    return lastWord
  }

  //var rf = {
    // //text = ["AH1 V", "R AA1 K", "B EH1 R L IY0", "V IH1 Z AH0 B AH0 L"]
    // rhymeLocation: function (text) {
    //   var wordLocation = text.length - 1;
    //   var vowelLocation = findVowelLocation(text[text.length - 1]);
    //   return [wordLocation, vowelLocation];
    //   //return [3,2]
    // },
    // lastVolAndCon: function (text) {
    //   return findLastVolAndCon(text[text.length-1])
    //   //return ['AH', ['L']]
    // },
    // findMatch: function () {
    // }

 // };

 // return rf;

});
