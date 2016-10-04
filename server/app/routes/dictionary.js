var router = require('express').Router();
var fs = require('fs');
var dictionary = __dirname + '/cmudict.txt';
var request = require('request');

function readTxtFile(file){
  return fs.readFileSync(file).toString();
}
var dictionaryFile = readTxtFile(dictionary);
console.log(!!dictionaryFile)

function formatDictionary(dictionaryFile) {
	var words = {};
	var lines = dictionaryFile.toString().split('\n');
	var lineSplit;
	lines.forEach(function (line) {
		lineSplit = line.split('  ');
		lineSplit[0] = lineSplit[0].replace(/[^a-z']+/gi, '').toLowerCase();
		if (!words[lineSplit[0]]) words[lineSplit[0]] = lineSplit[1];
	});
	return words;
}

var words = formatDictionary(dictionaryFile);

router.get('/', function(req, res, next) {
	res.json(words);
});

router.get('/buffer', function(req, res, next) {

	var bufferText = new Buffer('hello\nmy\nname\nis\nangela', 'utf-8');

	var formData = {
		wordfile: {
			value: bufferText,
			options: {
				filename: 'sample.txt',
				contentType: 'text/plain',
				contentLength: bufferText.length
			}
		}
	};

	request.post({url: 'http://www.speech.cs.cmu.edu/cgi-bin/tools/logios/lextool.pl', formData: formData}, function(err, httpResponse, body) {
		if (err) {
			return console.error('upload failed', err);
		}
		console.log('Upload successful!  Server responded with:', body);
		res.send(body);
	});

});

module.exports = router;
