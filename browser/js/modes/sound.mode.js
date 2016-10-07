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

  var findToken = function (stream) {
    var next = stream.next();
    var single = next;
    if (!next || next == ' ') return null;
    else {
      for (var i = 0; i < clusters.length; i++) {
        var current = "";
        for (var c = 0; c < clusters[i].length; c++) {
          // console.log('cluster: ' + clusters[i]);
          // console.log('next', next);
          if (next == clusters[i][c]) {
            current += next;
            if (c == clusters[i].length - 1) return current;
            else if (stream.peek()) next = stream.next();
            else break;
          }
          else {
            stream.backUp(c);
            break;
          }
        }
      }
    }
    console.log('single letter?', single);
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
      if (!next) {
        //next token is a space
        state.position[0]++;
        state.position[1] = -1;
        return null;
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
