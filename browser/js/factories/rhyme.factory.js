
app.factory('rhymeFactory', function () {
	//"there" => "DH EH R"
	function vowelLocation (parseSound) {
		var vowels = ['AO', 'AA', 'IY', 'UW', 'EH', 'IH', 'UH',
                  'AH', 'AX', 'AE', 'EY', 'AY', 'AW', 'OW', 'OY'];
        var word = parseSound.split(" ");
        //word = ["DH", "EH", "R"]
        for (var i = 0; i < word.length; i++) {
        	
        }
	};

  var rf = {};
  return rf;
});

//take the last word in the line
//find the location of vowel (sound?) and consonant (after the vowel);


