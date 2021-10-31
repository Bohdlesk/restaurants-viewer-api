const errorMessages = {
  default: 'Something went wrong',
  routeNotFound: 'Route not found',
  emptyBody: 'The body of the request cannot be empty',
  database: 'Database error',
  somethingWentWrong: 'Something went wrong',

  missedRequiredParam: 'Missed required parameter',
  userNotExist: 'User not exist',
  restaurantNotExist: 'Restaurant not exist',
  ratingIsOutOfRange: 'Review rating out of range (0 -5)',

  notValidDataInRequest: 'Not valid data in request',
};

module.exports = { errorMessages };
