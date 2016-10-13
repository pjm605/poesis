app.factory('nullToken', function () {
  return function (stream, state, findToken) {
    var next = findToken(stream);
    return null;
  }
})

app.factory('nullFactory', function () {
  var nf = {};
  nf.main = function (lineArray, cm) {
    var modeOptions = cm.getOption('mode');
    modeOptions.consonantRules = [];
    modeOptions.vowelLocations = [];
    modeOptions.rhymeLocations = [];
    modeOptions.stresses = [];
    cm.setOption('mode', modeOptions);
  }
  return nf;
})
