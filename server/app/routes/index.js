'use strict';
var router = require('express').Router(); // eslint-disable-line new-cap
var lexiconRouter = require('./lexicon');

router.use('/lexicon', lexiconRouter);

// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
  res.status(404).end();
});

module.exports = router;
