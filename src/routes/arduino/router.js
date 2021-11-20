const express = require('express');
const { handleErrorAsync } = require('#handleErrorAsync');

const router = new express.Router();

router.post('/', handleErrorAsync(...[require('./post')]));
router.get('/', handleErrorAsync(...[require('./get')]));

module.exports = router;
