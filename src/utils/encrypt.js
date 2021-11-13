const bcrypt = require('bcrypt');
const AppError = require('../utils/error-handler');

async function encrypt(data) {
  try {
    const slat = await bcrypt.genSalt(10);
    return await bcrypt.hash(data, slat);
  } catch (error) {
    AppError.defaultInternalServerError(error);
  }
}

async function compare(data, hash_data) {
  try {
    return await bcrypt.compare(data, hash_data);
  } catch (error) {
    AppError.defaultInternalServerError(error);
  }
}

module.exports = { encrypt, compare };
