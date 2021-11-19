import { encrypt } from '../../utils/encrypt';

const { sequelizeErrCodes } = require('../../enums');

const { createPageLimits } = require('../../utils/create-page-limits');
const AppError = require('#AppError');
const { initModels } = require('../models');
const { get, map } = require('lodash');
const { Op, fn, where, col } = require('sequelize');

async function findById(id) {
  try {
    if (!id)
      return AppError.badRequestError({
        message: AppError.errorMessages.missedRequiredParam,
        code: AppError.errorCodes.missedRequiredParam,
      });

    const { User } = await initModels().catch(AppError.dbError);

    const data = await User.findByPk(id).catch(AppError.dbError);

    return get(data, 'dataValues', null);
  } catch (error) {
    AppError.defaultInternalServerError(error);
  }
}

async function find(params = {}) {
  try {
    const { User } = await initModels().catch(AppError.dbError);

    let { search, page, perPage, status, ...findParams } = params;

    // findParams.status =
    //   status === 'all' ? ['active', 'inactive'] : status ? status : 'active';
    // if (search) {
    //   search = search.toString().trim().toLowerCase();
    //   findParams[Op.or] = [
    //     where(fn('lower', col('name')), {
    //       [Op.like]: `%${search}%`,
    //     }),
    //     where(fn('lower', col('address')), {
    //       [Op.like]: `%${search}%`,
    //     }),
    //   ];
    // }

    let { rows: data, count: total } = await User.findAndCountAll({
      where: { ...findParams },
      ...createPageLimits({ page, perPage }),
    }).catch((error) => {
      AppError.dbError(error);
    });
    data = map(data, 'dataValues');

    return data.length ? { data, total } : { data: [] };
  } catch (error) {
    AppError.defaultInternalServerError(error);
  }
}

async function create(user = {}) {
  try {
    const { User } = await initModels().catch(AppError.dbError);

    user.password = user.password && (await encrypt(user.password));

    const { dataValues } = await User.create(user).catch((error) => {
      if (
        get(error, 'original.code') === sequelizeErrCodes.uniqueConstraintError
      ) {
        return AppError.badRequestError({
          code: AppError.errorCodes.loginAlreadyUsed,
          message: AppError.errorMessages.loginAlreadyUsed,
        });
      }
      return AppError.dbError(error);
    });

    return dataValues;
  } catch (error) {
    AppError.defaultInternalServerError(error);
  }
}

module.exports = {
  User: { findById, find, create },
};
