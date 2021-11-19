const Joi = require('joi');

module.exports = {
  post: Joi.object({
    refreshToken: Joi.string().required(),
  }),
};
