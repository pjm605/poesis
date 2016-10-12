describe('lexiconFactory', function () {
	beforeEach(module('myApp'));

	var lexiconFactory;
	beforeEach('Get tools', inject(function (_$httpBackend_, _lexiconFactory_) {
		$httpBackend = _$httpBackend_;
		lexiconFactory = _lexiconFactory_;
	}));

	describe('fromLexiconServer', function () {
		var data;
		var responseData;

		beforeEach(function () {
			data =  "aabbcc"
			responseData = ["AA B K"];

			$httpBackend
				.expectPOST('/api/lexicon', { "words": data })
				.respond(responseData);
		});

		afterEach(function () {
			 $httpBackend.verifyNoOutstandingExpectation();
		});

		it('makes the expected POST request with expected data', function () {
            lexiconFactory.fromLexiconServer(data);
            $httpBackend.flush();
        });

        it('returns a promise that resolves to the data of the response', function (done) {
            lexiconFactory.fromLexiconServer(data).then(function (dict) {
            	expect(dict).to.be.deep.equal(responseData);
            })
            .catch(done)
            $httpBackend.flush();      
            done();       
        });


	})
	
})



