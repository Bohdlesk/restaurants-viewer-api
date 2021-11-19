const errorCodes = {
  emptyBody: 10,
  default: 1000,

  database: 5000,

  missedRequiredParam: 7001,
  userNotExist: 7002,
  restaurantNotExist: 7003,
  ratingIsOutOfRange: 7004,
  loginAlreadyUsed: 7005,

  notExist: 6000,
};

module.exports = { errorCodes };
