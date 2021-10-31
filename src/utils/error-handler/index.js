const { errorCodes } = require('./codes');
const { errorMessages } = require('./messages');
const { errorStatus } = require('./status');

class AppError extends Error {
  constructor(opts) {
    super(typeof opts === 'string' ? opts : opts.message);

    let data;
    let stack;
    let target;
    let code;
    let status;
    let message;

    if (typeof opts === 'string') {
      message = opts;
    } else if (typeof opts === 'object') {
      ({
        data,
        stack,
        target,
        status = errorStatus.internalServerError,
        code = errorCodes.default,
        message = errorMessages.somethingWentWrong,
      } = opts);
    }

    this.code = code;
    this.isCustom = true;
    this.status = status;
    this.target = target;
    this.message = message;
    this.data = JSON.stringify(data);

    if (stack) {
      this.stack = stack;
      this.stackStr = stack;
    } else {
      Error.captureStackTrace(this);
      this.stackStr = this.stack;
    }
  }
}

const dbError = (error) => {
  throw new AppError({
    code: error.code || AppError.errorCodes.database,
    status: error.status || AppError.errorStatus.internalServerError,
    message: error.message || JSON.stringify(error),
  });
};

const badRequestError = (error) => {
  throw new AppError({
    code: error.code || AppError.errorCodes.default,
    status: error.status || AppError.errorStatus.badRequest,
    message: error.message || JSON.stringify(error),
  });
};

const defaultInternalServerError = (error) => {
  throw new AppError({
    code: error.code || AppError.errorCodes.default,
    status: error.status || AppError.errorStatus.internalServerError,
    message: error.message || JSON.stringify(error),
  });
};

const errorModule = (module.exports = AppError);
errorModule.errorCodes = errorCodes;
errorModule.errorMessages = errorMessages;
errorModule.errorStatus = errorStatus;
errorModule.dbError = dbError;
errorModule.badRequestError = badRequestError;
errorModule.defaultInternalServerError = defaultInternalServerError;
