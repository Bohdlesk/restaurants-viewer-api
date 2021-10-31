/**
 * Middleware for validator errors handling
 */
const AppError = require('#AppError');

/**
 * Query headers validator function
 *
 * @param {function} schema Joi validation schema
 */
function validateHeaders(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.headers);

    if (error) {
      return next({
        status: AppError.errorStatus.badRequest,
        message:
          error.message || AppError.errorMessages.notValidDataInRequest,
      });
    }

    return next();
  };
}

/**
 * Query request parameters validator function
 *
 * @param {function} schema Joi validation schema
 */
function validateQuery(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.query);

    if (error) {
      return next({
        status: AppError.errorStatus.badRequest,
        message:
          error.message || AppError.errorMessages.notValidDataInRequest,
      });
    }

    return next();
  };
}

/**
 * Body request parameters validator function
 *
 * @param {function} schema Joi validation schema
 */
function validateBody(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      return next({
        status: AppError.errorStatus.badRequest,
        message:
          error.message || AppError.errorMessages.notValidDataInRequest,
      });
    }

    return next();
  };
}

/**
 * Params request parameters validator function
 *
 * @param {function} schema Joi validation schema
 */
function validateParams(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.params);

    if (error) {
      return next({
        status: AppError.errorStatus.badRequest,
        message:
          error.message || AppError.errorMessages.notValidDataInRequest,
      });
    }

    return next();
  };
}

module.exports = {
  validateBody,
  validateHeaders,
  validateParams,
  validateQuery,
};
