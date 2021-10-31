const express = require('express');
const { handleErrorAsync } = require('#handleErrorAsync');
const { validateBody, validateParams } = require('#Joi');
const schemas = require('./schemas');

const router = new express.Router();

router.post(
  '/',
  validateBody(schemas.post),
  handleErrorAsync(...[require('./post')])
);

router.get(
  '/',
  // validateParams(schemas.put.params),
  handleErrorAsync(...[require('./get')])
);

module.exports = router;
