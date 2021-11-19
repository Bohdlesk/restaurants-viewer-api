const Joi = require('joi');

module.exports = {
  post: Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    phone: Joi.string(),
    login: Joi.string().required(),
    password: Joi.string().required(),
  }),
};
