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

var bufferText = null;

router.post('/buffer', function(req, res, next) {
	if (req.body.words) {
		var words = req.body.words;
		bufferText = new Buffer(words, 'utf-8');
		res.sendStatus(200);
	} else {
		res.send('need the input!');
	}
});

router.get('/buffer', function(req, res, next) {

	var bufferText = new Buffer('hello\nmy\nname\nis\nangela', 'utf-8');
	var correctUrl;
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

		//new request
		var regex = /(ht|f)tp:\/\/([^ \,\;\:\!\)\(\"\'\\f\n\r\t\v])+/g;
		var resultUrls = body.match(regex);
		correctUrl = resultUrls[1];
		console.log('correctUrl', correctUrl);
		// res.send(correctUrl);
	}).then(function (response) {
		request(correctUrl, function(error, response, body) {
			if (!error) {
				//&& response.statusCode === 200
				//res.send(body);
				var newBody = body.split('\t').join(' ');
				newBody = newBody.split('\n');

				var resultObj = {};
				newBody.forEach(function (phonemes) {
					if (!resultObj[phonemes] && phonemes !== '') {
						phonemes = phonemes.split(/\s/);
						var keyWord = phonemes.splice(0,1);
						keyWord = keyWord.toString().replace(/[^a-z']+/gi, '').toLowerCase();
						phonemes = phonemes.join(' ');
						resultObj[keyWord] = phonemes;
					}
				});
				var resultArray = [];
				for(let key in resultObj) {
					resultArray.push(resultObj[key]);
				}
				console.log(resultArray);
				res.send(resultArray);
			} else {
				res.sendStatus(404);
			}
		});
	});

	//http://www.speech.cs.cmu.edu/tools/product/1475625444_11184/1157.dict

});

module.exports = router;
