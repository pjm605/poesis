describe('PhonemeFactory', function () {
	beforeEach(module('myApp'));

	var PhonemeFactory;
	beforeEach('Get tools', inject(function (_PhonemeFactory_) {
		PhonemeFactory = _PhonemeFactory_;
	}));

	it('is an object', function () {
        expect(PhonemeFactory).to.be.an('object');
    });

    // describe('getPhonemeCount', function () {

    // 	var word;
    // 	var dictionary;
    	
    //)
   
})