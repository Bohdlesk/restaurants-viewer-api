const express = require('express');
const { handleErrorAsync } = require('#handleErrorAsync');

const router = new express.Router();

router.get('/', handleErrorAsync(...[require('./get')]));

module.exports = router;
