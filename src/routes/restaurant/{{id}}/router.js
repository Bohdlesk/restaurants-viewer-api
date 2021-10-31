const express = require('express');
const { handleErrorAsync } = require('#handleErrorAsync');
const { validateBody, validateParams } = require('#Joi');
const schemas = require('./schemas');

const router = new express.Router({ mergeParams: true });

router.put(
  '/',
  validateParams(schemas.put.params),
  validateBody(schemas.put.body),
  handleErrorAsync(...[require('./put')])
);

router.get(
  '/',
  validateParams(schemas.put.params),
  handleErrorAsync(...[require('./get')])
);

module.exports = router;
