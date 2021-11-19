const Joi = require('joi');

module.exports = {
  post: Joi.object({
    login: Joi.string().required(),
    password: Joi.string().required(),
  }),
};
