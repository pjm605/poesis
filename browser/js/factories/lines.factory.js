app.factory('linesFactory', function () {
  return {
    returnLines: function (parseArray) {
      var lines = [[]];
      var i = 0;
      for (var p = 0; p < parseArray.length; p++) {
        if (parseArray[p] === 'BREAK') {
          i++;
          lines[i] = [];
        }
        else {
          lines[i].push(parseArray[p]);
        }
      }
      return lines;
    }
  }
});
