
app.factory('rhymeFactory', function () {

var isVowel = function (str) {
  if (/\d/.test(str[str.length-1])) return true;
  else return false;
};

//parseSound = "V IH1 Z AH0 B AH0 L"
function findVowelLocation (parseSound) {
  var word = parseSound.split(" ");
  //word = ["V", "IH1", "Z", "AH0", "B", "AH0", "L"]
  var vowelStore = []
    for (var i = 0; i < word.length; i++) {
      if(isVowel(word[i])) {
        vowelStore.push(word[i].replace(/[^A-Za-z]/,""))
      }
    }
  // vowelStore = [ 'IH', 'AH', 'AH' ]
  return vowelStore.length-1
}

  var rf = {
    //["AH1 V", "R AA1 K", "B EH1 R L IY0", "V IH1 Z AH0 B AH0 L"]
    rhymeLocation: function (text) {
      var vowelLocation = findVowelLocation(text[text.length-1]);
      var wordLocation = text.length-1
      return [wordLocation, vowelLocation];
      //[3,2]
    }
  };
  return rf;
});



