const Joi = require('joi');

module.exports = {
  post: Joi.object({
    name: Joi.string(),
    sid: Joi.string().required(),
  }),
  get: Joi.object({
    search: Joi.string(),
    page: Joi.number().integer(),
    perPage: Joi.number().integer(),
  }),
};
