const isProduction = false; // TODO make dynamic

const { errorMessages, errorStatus, errorCodes } = require('#AppError');
const { get } = require('lodash');

function makeBasicErrorObject(params) {
  return {
    url: params.url || params.route,
    _application: 'restaurants-api',
    _stage: process.env.stage || process.env.NODE_ENV,
    '@timestamp': new Date().toISOString(),
    statusCode: params.status,
    errorCode: params.code,
    message: get(params, 'message.message') || get(params, 'message'),
    request: {
      data: params.data,
      headers: params.headers,
      params: params.params || params.body,
      url: params.url || params.route,
      method: params.method,
      timeout: params.timeout,
    },
  };
}

function errorMiddleware(err, req, res, next) {
  const productionResponse = {
    status: err.status || errorStatus.internalServerError,
    code: err.code || errorCodes.default,
    message: err.isCustom ? err.message : errorMessages.default,
  };

  const developmentResponse = {
    ...productionResponse,
    stack: err.stack,
    message: err.message,
  };
  const logData = {
    route: req.url,
    method: req.method,
    body: req.body,
  };

  console.error(
    JSON.stringify(
      makeBasicErrorObject({
        ...developmentResponse,
        ...logData,
      })
    )
  );

  return res
    .status(productionResponse.status)
    .json(isProduction ? productionResponse : developmentResponse);
}

const handleErrorAsync = (func) => async (req, res, next) => {
  try {
    await func(req, res, next);
  } catch (error) {
    next(error);
  }
};

module.exports = { errorMiddleware, handleErrorAsync };
