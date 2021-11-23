import { authMiddleware } from '../../../../middlewares/auth-middleware';

const express = require('express');
const { handleErrorAsync } = require('#handleErrorAsync');

const router = new express.Router({ mergeParams: true });

router.get('/', authMiddleware, handleErrorAsync(...[require('./get')]));

module.exports = router;
