const Joi = require('joi');

module.exports = {
  post: Joi.object({
    name: Joi.string().required(),
    address: Joi.string(),
    status: Joi.string().valid('active', 'inactive'),
    user_id: Joi.number().integer(),
    web_site: Joi.string().uri(),
    pricing: Joi.number().integer().min(1).max(4),
  }),
};
