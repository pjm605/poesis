describe('soundFactory', function () {
	beforeEach(module('myApp'));

	var soundFactory;
	beforeEach('Get tools', inject(function (_soundFactory_) {
		soundFactory = _soundFactory_;
	}));

	it('is an object', function () {
        expect(soundFactory).to.be.an('object');
    });

    // describe('identifySignificant', function () {
    	
    // })
   
})