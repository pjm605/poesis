
app.factory('rhymeFactory', function () {

  var isVowel = function (str) {
    if (/\d/.test(str[str.length -1 ])) return true;
    else return false;
  };

  //parseSound = "V IH1 Z AH0 B AH0 L"
  function findVowelLocation (parseSound) {
    var word = parseSound.split(" ");
    //word = ["V", "IH1", "Z", "AH0", "B", "AH0", "L"]
    var vowelStore = [];
      for (var i = 0; i < word.length; i++) {
        if (isVowel(word[i])) {
          vowelStore.push(word[i].replace(/[^A-Za-z]/,""));
        };
      }
    // vowelStore = [ 'IH', 'AH', 'AH' ]
    console.log("THIS IS VOWEL STOREEEEEE, ", vowelStore)
    if(!vowelStore.length) return 0
    else return vowelStore.length - 1;
  };

  function findRhymeMatch (parseSound) {
    var word = parseSound.split(" ");
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
  
    return [lastVowel, consonants];
    //return ['AH', ['L', 'H']]

  }

  var rf = {
    //text = ["AH1 V", "R AA1 K", "B EH1 R L IY0", "V IH1 Z AH0 B AH0 L"]
    rhymeLocation: function (text) {
      var wordLocation = text.length - 1;
      var vowelLocation = findVowelLocation(text[text.length - 1]);
      return [wordLocation, vowelLocation];
      //return [3,2]
    },
    rhymeMatch: function (text) {
      return findRhymeMatch(text[text.length-1])
    }
  };

  return rf;

});
