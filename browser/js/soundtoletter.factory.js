app.factory('soundToLetter', function() {
  return function (soundarr) {
  	var result = [];
  	var rule = {
      iy: 'ea',
	    ih: 'i',
    	eh: 'e',
	    ae: 'a',
      aa: 'o',
      ax: 'e',
      ah: 'u',
      uw: 'oo',
      uh: 'oo',
      aw: 'ou',
      er: 'ir',
      axr: 'er',
      ey: 'ai',
      ay: 'i',
      oy: 'o',
      ow: 'oa',
      ao: 'ou',
      zh: 's',
      dx: 'tt',
      el: 'le',
      em: 'om',
      en: 'n'
    };
    for (var i = 0; i < soundarr.length; i++) {
      var sound = soundarr[i].toLowerCase();
      if(rule.hasOwnProperty(sound)) result.push(rule[sound]);
   	  else result.push(sound);
    }
	  return result;
 };
});
