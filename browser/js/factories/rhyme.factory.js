
app.factory('rhymeFactory', function () {
	//parseSound => "W UH M AH N"
	function findVowelLocation (parseSound) {
		var vowels = ['AO', 'AA', 'IY', 'UW', 'EH', 'IH', 'UH',
                  'AH', 'AX', 'AE', 'EY', 'AY', 'AW', 'OW', 'OY'];
    var word = parseSound.split(" ");
        //word = ["W", "UH", "M", "AH", "N"]
    var vowelSound = ""
      for (var i = 0; i < word.length; i++) {
        if(vowels.indexOf(word[i]) >= 0) {
          vowelSound = word[i]
        };
      };
    


	};

  var rf = {
 
  };
  return rf;
});

//take the last word in the line
//return index of word in text & index of vowel in the word
//


