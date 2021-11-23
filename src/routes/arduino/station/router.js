import { authMiddleware } from '../../../middlewares/auth-middleware';

const express = require('express');
const { handleErrorAsync } = require('#handleErrorAsync');
const { validateBody } = require('#Joi');
const schemas = require('./schemas');

const router = new express.Router();

router.post(
  '/',
  authMiddleware,
  validateBody(schemas.post),
  handleErrorAsync(...[require('./post')])
);

router.get(
  '/',
  authMiddleware,
  validateBody(schemas.get),
  handleErrorAsync(...[require('./get')])
);

module.exports = router;
