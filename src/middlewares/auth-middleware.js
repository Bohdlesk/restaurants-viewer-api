const AppError = require('#AppError');
const { validateJwtToken } = require('../utils/jwt-auth');

const { get } = require('lodash');

function authMiddleware(req, res, next) {
  const noTokenError = {
    success: false,
    status: AppError.errorStatus.unauthorized,
    code: AppError.errorCodes.jwtTokenNotProvided,
    message: AppError.errorMessages.jwtTokenIsNotProvided,
  };

  const authToken = get(req, 'headers.authorization', null);

  if (!authToken) {
    return res.status(401).send(noTokenError);
  }

  const user = validateJwtToken(authToken);
  if (user) {
    req.user = user;
    return next();
  }
  return res.status(401).send(AppError.unauthorizedError);
}

module.exports = { authMiddleware };
