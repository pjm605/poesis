var router = require('express').Router();
var fs = require('fs');
var dictionary = __dirname + '/cmudict.txt';

function readTxtFile(file){
  return fs.readFileSync(file).toString();
}
var dictionaryFile = readTxtFile(dictionary);
console.log(!!dictionaryFile)

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
//console.log(words); this works

router.get('/', function(req, res, next) {
	res.json(words);
});


module.exports = router;
