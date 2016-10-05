// describe('dictionaryFactory', function () {
// 	beforeEach(module('myApp'));

// 	var dictionaryFactory;
// 	beforeEach('Get tools', inject(function (_$httpBackend_, _parse_) {
// 		$httpBackend = _$httpBackend_;
// 		dictionaryFactory = _parse_;
// 	}));

// 	describe('parseFromdictionary', function () {
// 		var word;
// 		var responseData;

// 		beforeEach(function () {
// 			word = 'AABBDDCC';
// 			responseData = 'hapax';

// 			$httpBackend
// 				.expectGET('/api/dictionary')
// 				.respond(responseData);
// 		});

// 		afterEach(function () {
// 			 $httpBackend.verifyNoOutstandingExpectation();
// 		});

// 		it('makes the expected request when called', function () {
//             dictionaryFactory();
//             $httpBackend.flush();
//         });

//         it('returns a promise that resolves to the data of the response', function (done) {
//             dictionaryFactory(word).then(function (dict) {
//             	expect(dict).to.be.deep.equal(responseData);
//             	done();
//             });
//             $httpBackend.flush();             
//         });


// 	})
	
   
// })