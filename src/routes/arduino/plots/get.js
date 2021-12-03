import { Humidity, Temperature } from '../../../db/helpers';

const AppError = require('#AppError');

async function Handler(req, res) {
  try {
    const { dataType, dateFrom, dateTo } = req.query;

    const temperatures =
      dataType === 'temperature' || dataType.indexOf('temperature') !== -1
        ? await Temperature.getDataForPlots({
            dateFrom,
            dateTo,
          })
        : undefined;
    const humidity =
      dataType === 'humidity' || dataType.indexOf('humidity') !== -1
        ? await Humidity.getDataForPlots({ dateFrom, dateTo })
        : undefined;

    return res.status(200).send({ temperatures, humidity });
  } catch (error) {
    AppError.defaultInternalServerError(error);
  }
}

module.exports = Handler;
