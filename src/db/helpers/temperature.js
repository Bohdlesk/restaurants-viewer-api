const AppError = require('#AppError');
const { initModels } = require('../models');
const { map } = require('lodash');
const moment = require('moment');

async function create(data = {}) {
  try {
    const { Temperature } = await initModels().catch(AppError.dbError);

    const latestData = await findLastTwoValues(data.station_id);
    if (
      latestData.length === 2 &&
      latestData[0].data === data.data &&
      latestData[1].data === data.data
    ) {
      const lastValueId = latestData[0].id;
      const currentTime = moment.utc().format();
      await Temperature.update(
        {
          received: currentTime,
        },
        { where: { id: lastValueId } }
      ).catch((error) => {
        return AppError.dbError(error);
      });

      return true;
    }

    const { dataValues } = await Temperature.create(data).catch((error) => {
      return AppError.dbError(error);
    });

    return dataValues;
  } catch (error) {
    AppError.defaultInternalServerError(error);
  }
}

async function findLastTwoValues(stationId) {
  try {
    const { Temperature } = await initModels().catch(AppError.dbError);

    let data = await Temperature.findAll({
      where: {
        station_id: stationId,
      },
      attributes: ['id', 'data'],
      limit: 2,
      order: [['id', 'desc']],
    }).catch((error) => {
      AppError.dbError(error);
    });
    data = map(data, 'dataValues');

    return data.length ? data : [];
  } catch (error) {
    AppError.defaultInternalServerError(error);
  }
}

async function findLatestValue(stationId) {
  try {
    const { Temperature } = await initModels().catch(AppError.dbError);

    let data = await Temperature.findAll({
      where: {
        station_id: stationId,
      },
      attributes: ['id', 'data', 'received'],
      limit: 1,
      order: [['id', 'desc']],
    }).catch((error) => {
      AppError.dbError(error);
    });
    data = map(data, 'dataValues');

    return data.length ? data[0] : {};
  } catch (error) {
    AppError.defaultInternalServerError(error);
  }
}

module.exports = {
  Temperature: {
    create,
    findLatestValue,
  },
};
