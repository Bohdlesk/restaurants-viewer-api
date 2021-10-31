const express = require('express');
const { handleErrorAsync } = require('#handleErrorAsync');
const { validateBody } = require('#Joi');
const schemas = require('./schemas');

const router = new express.Router();

router.post(
  '/',
  validateBody(schemas.post),
  handleErrorAsync(...[require('./post')])
);
router.get('/', handleErrorAsync(...[require('./get')]));

module.exports = router;
