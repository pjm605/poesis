'use strict';
var router = require('express').Router(); // eslint-disable-line new-cap
var mainRouter = require('./main');




router.use('/main', mainRouter);


// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});
module.exports = router;