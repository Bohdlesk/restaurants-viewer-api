const AppError = require('#AppError');
const { initModels } = require('../models');

async function create(data = {}) {
  try {
    const { Arduino } = await initModels().catch(AppError.dbError);

    const { dataValues } = await Arduino.create(data).catch((error) => {
      AppError.dbError(error);
    });

    return dataValues;
  } catch (error) {
    AppError.defaultInternalServerError(error);
  }
}

module.exports = {
  Arduino: {
    create,
  },
};
