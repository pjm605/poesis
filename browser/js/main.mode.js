CodeMirror.defineMode('mainMode', function (config, parserConfig) {

  var genericVowelColors = ['lightpink', 'red', 'burgundy', 'cranberry', 'orange'];
  var currentPositions = {};
  var vowelColors = {};
  let i = 0;
  for (var vow in parserConfig.vowelLocations) {
    currentPositions[vow] = 0;
    vowelColors[vow] = genericVowelColors[i];
    i++;
  }


  var clusters = ['tio', 'sh', 'th', 'ng', 'ch', 'ie', 'ou', 'ei', 'qu', 'ey', 'oy', 'ay', 'au', 'uy', 'oi', 'ee', 'ai', 'ow', 'ea', 'oo'];


  var isVowel = function (tok, stream) {
    // does not modify the stream
    var simpleVowels = ['a', 'e', 'i', 'o', 'u'];
    if (tok === 'y') {
      if (stream.peek() && isVowel(stream.peek(), stream)) {
        return false;
      }
      return true;
    }
    return tok && simpleVowels.indexOf(tok[0]) > -1;
  };

  var findToken = function (stream) {
    var next = stream.next();
    var single = next;
    if (!next || next === ' ') return null;
    else {
      next = next.toLowerCase();
      for (var i = 0; i < clusters.length; i++) {
        var current = '';
        for (var c = 0; c < clusters[i].length; c++) {
          if (next === clusters[i][c]) {
            current += next;
          }
          else {
            stream.backUp(stream.current().length);
            next = stream.next().toLowerCase();
            break;
          }
          //are we at the end of the text?
          if (stream.peek()) next = stream.next().toLowerCase();
          else if (c < clusters[i].length - 1) {
            stream.backUp(stream.current().length);
            next = stream.next().toLowerCase();
            break;
          }
          else {
            stream.next();
          }
        }
        if (current === clusters[i]) {
          stream.backUp(1);
          return current;
        }
      }
    }
    return single;
  };

  return {
    startState: function () {
      return {
        position: [0, -1]
      };
    },
    token: function (stream, state) {
      return parserConfig.token(stream, state, findToken, parserConfig, isVowel, currentPositions, vowelColors);
    }
  };
});
