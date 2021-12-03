const AppError = require('#AppError');
const { initModels } = require('../models');
const { map } = require('lodash');
const { Op } = require('sequelize');

const moment = require('moment');

async function create(data = {}) {
  try {
    const { Humidity } = await initModels().catch(AppError.dbError);

    const latestData = await findLastTwoValues(data.station_id);
    if (
      latestData.length === 2 &&
      latestData[0].data === data.data &&
      latestData[1].data === data.data
    ) {
      const lastValueId = latestData[0].id;
      const currentTime = moment.utc().format();
      await Humidity.update(
        {
          received: currentTime,
        },
        { where: { id: lastValueId } }
      ).catch((error) => {
        return AppError.dbError(error);
      });

      return true;
    }

    const { dataValues } = await Humidity.create(data).catch((error) => {
      return AppError.dbError(error);
    });

    return dataValues;
  } catch (error) {
    AppError.defaultInternalServerError(error);
  }
}

async function findLastTwoValues(stationId) {
  try {
    const { Humidity } = await initModels().catch(AppError.dbError);

    let data = await Humidity.findAll({
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
    const { Humidity } = await initModels().catch(AppError.dbError);

    let data = await Humidity.findAll({
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

async function getDataForPlots(params = {}) {
  try {
    const { Humidity } = await initModels().catch(AppError.dbError);

    let data = await Humidity.findAll({
      where: {
        [Op.and]: [
          {
            received: {
              [Op.gte]: params.dateFrom
                ? moment.utc(params.dateFrom).format()
                : moment.utc().subtract(1, 'isoWeek').format(),
            },
          },
          {
            received: {
              [Op.lte]: params.dateTo
                ? moment.utc(params.dateTo).format()
                : moment.utc().format(),
            },
          },
        ],
      },
      attributes: ['id', 'data', 'received'],
      order: [['id', 'asc']],
    }).catch((error) => {
      AppError.dbError(error);
    });
    data = map(data, 'dataValues');

    return data.length ? data : {};
  } catch (error) {
    AppError.defaultInternalServerError(error);
  }
}

module.exports = {
  Humidity: {
    create,
    findLatestValue,
    getDataForPlots,
  },
};
