var router = require('express').Router();
var fs = require('fs');
var rp =  require('request-promise');
var dictionary = __dirname + '/cmudict.txt';

function readTxtFile(file){
  return fs.readFileSync(file).toString();
}

var dictionaryFile = readTxtFile(dictionary);

function formatDictionary(dictionaryFile) {
	var words = {};
	var lines = dictionaryFile.toString().split('\n');
	var lineSplit;
	lines.forEach(function (line) {
		lineSplit = line.split('  ');
		lineSplit[0] = lineSplit[0].replace(/[^a-z'-]+/gi, '').toLowerCase();
		if (!words[lineSplit[0]]) words[lineSplit[0]] = lineSplit[1];
	});
	return words;
}

var dictionaryWords = formatDictionary(dictionaryFile);

router.post('/', function(req, res, next) {

	var words = req.body.words;
	var bufferText = new Buffer(words, 'utf-8');
	var correctUrl = null;
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

	rp({method: 'POST', uri: 'http://www.speech.cs.cmu.edu/cgi-bin/tools/logios/lextool.pl', formData: formData})
	.then(function(parsedBody) {
		//console.log('Upload successful!  Server responded with:', parsedBody);

		//get the URI for the second request
		var regex = /(ht|f)tp:\/\/([^ \,\;\:\!\)\(\"\'\\f\n\r\t\v])+/g;
		//this returns two URI listed in the html parsedBody
		var resultUrls = parsedBody.match(regex);
		//get the second URI
		correctUrl = resultUrls[1];

		//second request
		console.log(correctUrl);
		return rp({method: 'GET', uri: correctUrl})
	})
	.then(function(response) {
		if (response) {
			var responseBody = response.split('\t').join(' ');
			responseBody = responseBody.split('\n');
			console.log('responseBody', responseBody);
			var resultArray = [];
			responseBody.forEach(function (phonemes) {
				phonemes = phonemes.split(/\s/);
				phonemes.splice(0, 1);
				phonemes = phonemes.join(' ');
				if (phonemes !== '') resultArray.push(phonemes);
			});
			res.send(resultArray);
		} else {
			res.sendStatus(404);
		}
	})
	.catch(function (handleError) {
		console.error('POST request failed', handleError);
	});

});

router.get('/cmudictionary', function(req, res, next) {
	res.json(dictionaryWords);
});

module.exports = router;
