//
// class Restaurant {
//   restaurant = {};
//
//   constructor({ name, address, status, userId, webSite, pricing } = {}) {
//     this.restaurant.name = name;
//     this.restaurant.address = address;
//     this.restaurant.status = status;
//     this.restaurant.user_id = userId;
//     this.restaurant.web_site = webSite;
//     this.restaurant.pricing = pricing;
//   }
//
//   async saveToDatabase() {
//     try {
//       const { Restaurant } = await db.initModels().catch(AppError.dbError);
//
//
//
//       const data = await Restaurant.create(this.restaurant, {
//         raw: true,
//       }).catch((error) => {
//         return AppError.dbError(error);
//       });
//
//       return data;
//     } catch (error) {
//       AppError.defaultInternalServerError(error);
//     }
//   }
// }
//
// module.exports = Restaurant;

const { createPageLimits } = require('../../utils/create-page-limits');
const AppError = require('#AppError');
const { initModels } = require('../models');
const { get, map } = require('lodash');
const { Op, fn, where, col } = require('sequelize');

async function create(restaurant = {}) {
  try {
    const { Restaurant } = await initModels().catch(AppError.dbError);

    const { dataValues } = await Restaurant.create(restaurant).catch(
      (error) => {
        if (get(error, 'parent.constraint') === 'restaurants_user_id_fkey')
          return AppError.badRequestError({
            code: AppError.errorCodes.userNotExist,
            message: AppError.errorMessages.userNotExist,
          });
        AppError.dbError(error);
      }
    );

    return dataValues;
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

    const { Restaurant } = await initModels().catch(AppError.dbError);

    const data = await Restaurant.findByPk(id).catch(AppError.dbError);

    return get(data, 'dataValues', null);
  } catch (error) {
    AppError.defaultInternalServerError(error);
  }
}

async function find(params = {}) {
  try {
    const { Restaurant } = await initModels().catch(AppError.dbError);

    let { search, page, perPage, status, ...findParams } = params;

    findParams.status =
      status === 'all' ? ['active', 'inactive'] : status ? status : 'active';

    if (search) {
      search = search.toString().trim().toLowerCase();
      findParams[Op.or] = [
        where(fn('lower', col('name')), {
          [Op.like]: `%${search}%`,
        }),
        where(fn('lower', col('address')), {
          [Op.like]: `%${search}%`,
        }),
      ];
    }

    let { rows: data, count: total } = await Restaurant.findAndCountAll({
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

async function update(id, params = {}) {
  try {
    if (!id)
      AppError.badRequestError({
        message: AppError.errorMessages.missedRequiredParam,
        code: AppError.errorCodes.missedRequiredParam,
      });
    const { Restaurant } = await initModels().catch(AppError.dbError);

    const data = await Restaurant.update(params, {
      where: { id },
      returning: true,
    }).catch((error) => {
      if (get(error, 'parent.constraint') === 'restaurants_user_id_fkey')
        AppError.badRequestError({
          code: AppError.errorCodes.userNotExist,
          message: AppError.errorMessages.userNotExist,
        });
      AppError.dbError(error);
    });

    return get(data, '[1][0].dataValues');
  } catch (error) {
    AppError.defaultInternalServerError(error);
  }
}

module.exports = {
  Restaurant: {
    create,
    findById,
    find,
    update,
  },
};
