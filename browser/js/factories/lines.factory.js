app.factory('lines', function () {
  return function (parseArray) {
    var lines = [[]];
    var i = 0;
    for (var p = 0; p < parseArray.length; p++) {
      if (parseArray[p] === 'BREAK') {
        console.log('hit a break');
        i++;
        lines[i] = [];
      }
      else {
        lines[i].push(parseArray[p]);
      }
    }
    console.log('LINES', lines);
    return lines;
  };
});
