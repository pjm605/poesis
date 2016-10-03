describe('SoundFactory', function () {
	beforeEach(module('myApp'));

	var SoundFactory;
	beforeEach('Get tools', inject(function (_SoundFactory_) {
		SoundFactory = _SoundFactory_;
	}));

	it('is an object', function () {
        expect(SoundFactory).to.be.an('object');
    });

   
})