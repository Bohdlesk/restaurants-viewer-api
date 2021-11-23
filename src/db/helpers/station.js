import * as sequelizeErrCodes from '../../enums/sequelizeErrCodes';

const { createPageLimits } = require('../../utils/create-page-limits');
const AppError = require('#AppError');
const { initModels } = require('../models');
const { get, map } = require('lodash');
const { Op, fn, where, col } = require('sequelize');

async function create(data = {}) {
  try {
    const { Station } = await initModels().catch(AppError.dbError);

    const { dataValues } = await Station.create(data).catch((error) => {
      if (
        get(error, 'original.code') ===
        sequelizeErrCodes.foreignKeyConstraintError
      ) {
        return AppError.badRequestError({
          code: AppError.errorCodes.userNotExist,
          message: AppError.errorMessages.userNotExist,
        });
      }
      return AppError.dbError(error);
    });

    return dataValues;
  } catch (error) {
    AppError.defaultInternalServerError(error);
  }
}

async function find(params = {}) {
  try {
    const { Station } = await initModels().catch(AppError.dbError);

    let { search, page, perPage, ...findParams } = params;

    if (search) {
      search = search.toString().trim().toLowerCase();
      findParams[Op.or] = [
        where(fn('lower', col('name')), {
          [Op.like]: `%${search}%`,
        }),

        where(fn('lower', col('sid')), {
          [Op.like]: `%${search}%`,
        }),
      ];
    }

    let { rows: data, count: total } = await Station.findAndCountAll({
      where: { ...findParams },
      ...createPageLimits({ page, perPage }),
    }).catch((error) => {
      if (get(error, 'parent.routine') === 'enum_in') {
        AppError.badRequestError(error);
      }
      AppError.dbError(error);
    });
    data = map(data, 'dataValues');

    return data.length ? { data, total } : { data: [], total: 0 };
  } catch (error) {
    AppError.defaultInternalServerError(error);
  }
}

async function update(id, params = {}) {
  try {
    const { Station } = await initModels().catch(AppError.dbError);

    const data = await Station.update(params, {
      where: { id },
      returning: true,
    }).catch((error) => {
      AppError.dbError(error);
    });

    return get(data, '[1][0].dataValues');
  } catch (error) {
    AppError.defaultInternalServerError(error);
  }
}

module.exports = {
  Station: {
    create,
    find,
    update,
  },
};
