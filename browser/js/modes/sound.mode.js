CodeMirror.defineMode('soundMode', function (config, parserConfig) {
  var simpleVowels = ['a', 'e', 'i', 'o', 'u'];
  var consonantRules = parserConfig.consonantRules;
  var vowelLocations = parserConfig.vowelLocations;
  var colors = ['red', 'green', 'blue', 'yellow'];
  var currentPositions = {};
  var clusters = ['tio', 'sh', 'th', 'ch', 'ie', 'ou', 'ei', 'oi', 'ai', 'ow', 'ea', 'oo'];

  for (var vow in vowelLocations) {
    currentPositions[vow] = 0;
  }

  var isVowel = function (tok) {
    return tok && simpleVowels.indexOf(tok[0]);
  };

  var findToken = function (stream) {
    var next = stream.next();
    var single = next;
    if (!next || next == ' ') return null;
    else {
      next = next.toLowerCase();
      for (var i = 0; i < clusters.length; i++) {
        var current = "";
        // console.log('trying....', clusters[i]);
        for (var c = 0; c < clusters[i].length; c++) {
          //  console.log('cluster: ' + clusters[i][c]);
          //  console.log('next', next);
          if (next == clusters[i][c]) {
            current += next;
            if (stream.peek()) next = stream.next().toLowerCase();
            else {
              //console.log('break reached');
              stream.backUp(c);
              break;
            }
          }
          else {
            stream.backUp(c+1);
            next = stream.next();
          //  console.log('other break reached');
            break;
          }
        }
        if (current == clusters[i]) return current;
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
      var next = findToken(stream);
      console.log('NEXT', next);
      if (!next) {
        //next token is a space or does not exist
        state.position[0]++;
        state.position[1] = -1;
        return null;
      }
      else if (isVowel(next)) {
        //next token is a vowel
        console.log(next, 'is a vowel!!');
      }
      else {
        //next token is a consonant
        console.log(next, 'is a consonant');
      }
    }
  };
});


//       else {
//       //     next.toLowerCase();
//       // //  if (true) {
//       //     //next token is a vowel
//       //     stream.backUp();
//       //     var vowelTest = stream.match(/^(ie|ou|ei|oi|ai|ow|ea|oo|[aeiou])/, false, false);
//       //     //var vowelTest = stream.match(/[aeiou]/);
//       //     console.log('This is what stream.match returns', (vowelTest ? vowelTest : ""));
//       //     if (vowelTest) {
//       //       console.log('vowel test passed!!');
//       //       for (var i = 0; i < vowelTest[0].length; i++) {
//       //         stream.next();
//       //       }
//       //       state.position[1]++;
//       //       console.log('state position', state.position);
//       //       for (var vow in vowelLocations) {
//       //         var nextVowel = vowelLocations[vow][currentPositions[vow]];
//       //         // console.log(state.position, "state.position");
//       //         // console.log(nextVowel, 'nextvowel');
//       //         if (nextVowel && state.position[0] == nextVowel[0] && state.position[1] == nextVowel[1]) {
//       //           currentPositions[vow]++;
//       //           return 'blue';
//       //         }
//       //       }
//       //     }
//         //}
//           // else {
//
//           //next token is a consonant
//           //  next = stream.next();
//             for (var i = 0; i < consonantRules.length; i++) {
//               if (next == consonantRules[i][0]) {
//                 if (consonantRules[i].length == 1) return colors[i];
//                 for (var char = 1; char < consonantRules[i].length; char++) {
//                   if (consonantRules[i][char] != stream.next()) {
//                     stream.backUp(char);
//                   }
//                   else return colors[i];
//                 }
//               }
//             }
//             return null;
//         }
//       }
//     // }
//   }
// });
