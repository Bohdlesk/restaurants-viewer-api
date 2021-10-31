const Joi = require('joi');

module.exports = {
  post: Joi.object({
    restaurant_id: Joi.number().integer(),
    rating: Joi.number().integer(),
    name: Joi.number().integer(),
    user_id: Joi.number().integer(),
    status: Joi.string().valid('active', 'inactive'),
    review_text: Joi.string(),
  }),
};
