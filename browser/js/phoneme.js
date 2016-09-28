var fs = require("fs");

var dictionary = require('./cmudict.txt');

function readTxtFile(file){
  return fs.readFileSync(file).toString();
}

var dictionaryFile = readTxtFile(dictionary);

function findACount(str) {
  if (/\d/gi.test(str)){
    return str.match(/\d/gi).length;
  }
  return false;
}

function formatDictionary(dictionaryFile) {
	var words = {};
	var lines = dictionaryFile.toString().split("\n");
	var lineSplit;
	lines.forEach(function (line) {
		lineSplit = line.split("  ");
		lineSplit[0] = lineSplit[0].toLowerCase();
		words[lineSplit[0]] = lineSplit[1]; 
	});
	return words;
}

var words = formatDictionary(dictionaryFile);

function phoneme(word) {
	var phonemes = words[word.toLowerCase()];
	if (/\d/gi.test(word)){
		return phonemes[1].match(/(\d)/gi).length;
	}
	return null;
}


