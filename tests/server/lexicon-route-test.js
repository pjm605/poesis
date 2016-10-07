var fs = require('fs');
var path = require('path');
var rp =  require('request-promise');
var chai = require('chai');
var expect = chai.expect;
chai.use(require('chai-properties'));
chai.use(require('chai-things'));
var supertest = require('supertest-as-promised');

describe('Server', function () {
	var app = require('../../server/index.js');
	var agent = supertest(app);

	describe('/route', function () {

		var indexContents;
		beforeEach( 'Get index.html file contents', function (done) {
			fs.readFile(path.join(__dirname, '../../browser/index.html'), 'utf8', function (err, contents) {
				if (err) return done(err);
				indexContents = contents;
				done();
			});
		});

		it('serves up index.html', function () {
			return agent
			.get('/')
			.expect(200)
			.then(function (res) {
				expect(res.text).to.be.equal(indexContents);
			});
		});
	});
});