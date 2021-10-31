const { createPageLimits } = require('../../utils/create-page-limits');
const AppError = require('#AppError');
const { initModels } = require('../models');
const { get, map } = require('lodash');
const { Op, fn, where, col } = require('sequelize');

async function create(review = {}) {
  try {
    const { Review } = await initModels().catch(AppError.dbError);

    if (review.rating > 5 || review.rating < 1)
      return AppError.badRequestError({
        code: AppError.errorCodes.ratingIsOutOfRange,
        message: AppError.errorMessages.ratingIsOutOfRange,
      });

    const { dataValues } = await Review.create(review).catch((error) => {
      if (get(error, 'parent.constraint') === 'reviews_restaurant_id_fkey')
        return AppError.badRequestError({
          code: AppError.errorCodes.restaurantNotExist,
          message: AppError.errorMessages.restaurantNotExist,
        });
      AppError.dbError(error);
    });

    return dataValues;
  } catch (error) {
    AppError.defaultInternalServerError(error);
  }
}

async function find(params = {}) {
  try {
    const { Review } = await initModels().catch(AppError.dbError);

    let { search, page, perPage, status, ...findParams } = params;

    findParams.status =
      status === 'all' ? ['active', 'inactive'] : status ? status : 'active';

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

    let { rows: data, count: total } = await Review.findAndCountAll({
      where: { ...findParams },
      ...createPageLimits({ page, perPage }),
    }).catch((error) => {
      if (get(error, 'parent.routine') === 'enum_in') {
        AppError.badRequestError(error);
      }
      AppError.dbError(error);
    });
    data = map(data, 'dataValues');

    return data.length ? { data, total } : { data: [] };
  } catch (error) {
    AppError.defaultInternalServerError(error);
  }
}

async function findById(id) {
  try {
    if (!id)
      return AppError.badRequestError({
        message: AppError.errorMessages.missedRequiredParam,
        code: AppError.errorCodes.missedRequiredParam,
      });

    const { Review } = await initModels().catch(AppError.dbError);

    const data = await Review.findByPk(id).catch(AppError.dbError);

    return get(data, 'dataValues', null);
  } catch (error) {
    AppError.defaultInternalServerError(error);
  }
}

async function update(id, params = {}) {
  try {
    if (!id)
      AppError.badRequestError({
        message: AppError.errorMessages.missedRequiredParam,
        code: AppError.errorCodes.missedRequiredParam,
      });
    const { Review } = await initModels().catch(AppError.dbError);

    const data = await Review.update(params, {
      where: { id },
      returning: true,
    }).catch((error) => {
      if (get(error, 'parent.constraint') === 'reviews_user_id_fkey')
        AppError.badRequestError({
          code: AppError.errorCodes.userNotExist,
          message: AppError.errorMessages.userNotExist,
        });
      if (get(error, 'parent.constraint') === 'reviews_restaurant_id_fkey')
        AppError.badRequestError({
          code: AppError.errorCodes.restaurantNotExist,
          message: AppError.errorMessages.restaurantNotExist,
        });
      AppError.dbError(error);
    });

    return get(data, '[1][0].dataValues');
  } catch (error) {
    AppError.defaultInternalServerError(error);
  }
}

module.exports = {
  Review: { findById, find, create, update },
};
