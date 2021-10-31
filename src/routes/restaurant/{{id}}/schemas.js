const Joi = require('joi');

module.exports = {
  put: {
    params: Joi.object({
      id: Joi.number().integer().required(),
    }),
    body: Joi.object({
      name: Joi.string(),
      address: Joi.string(),
      status: Joi.string().valid('active', 'inactive', 'deleted'),
      user_id: Joi.number().integer(),
      web_site: Joi.string().uri(),
      pricing: Joi.number().integer().min(1).max(4),
    }),
  },
};
