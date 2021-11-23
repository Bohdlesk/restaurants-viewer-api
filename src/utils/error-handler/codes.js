const errorCodes = {
  emptyBody: 10,
  default: 1000,

  database: 5000,

  missedRequiredParam: 7001,
  userNotExist: 7002,
  restaurantNotExist: 7003,
  ratingIsOutOfRange: 7004,
  loginAlreadyUsed: 7005,
  stationNotFound: 7006,

  notExist: 6000,

  jwtTokenUnauthorized: 9001,
  jwtTokenNotProvided: 9002,
  errorDuringAuthHandling: 9003,
};

module.exports = { errorCodes };
