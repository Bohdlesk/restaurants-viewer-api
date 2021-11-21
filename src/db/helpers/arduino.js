const AppError = require('#AppError');
const { initModels } = require('../models');
const { get } = require('lodash');

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

async function getCurrentTemperature() {
  try {
    const { Arduino } = await initModels().catch(AppError.dbError);

    const data = await Arduino.findAll({
      limit: 1,
      order: [['id', 'desc']],
    }).catch((error) => {
      AppError.dbError(error);
    });

    return get(data, '[0].dataValues');
  } catch (error) {
    AppError.defaultInternalServerError(error);
  }
}

module.exports = {
  Arduino: {
    create,
    getCurrentTemperature,
  },
};
