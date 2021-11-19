const Joi = require('joi');

module.exports = {
  post: Joi.object({
    name: Joi.string(),
    email: Joi.string(),
    phone: Joi.string(),
    login: Joi.string().required(),
    password: Joi.string().required(),
  }),
};
