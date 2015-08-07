'use strict';
var router = require('express').Router();
module.exports = router;

router.use('/members', require('./members'));
router.use('/addresses', require('./addresses'));
router.use('/routes', require('./routes'));
router.use('/favorites', require('./favorites'));

// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});
