const sequelize = require('sequelize');
const { importModels } = require('../../utils/import-models');
const { getConnection } = require('../../utils/sequelize');

let models = null;

async function initModels(sync) {
  try {
    if (models) {
      return models;
    }
    const sequelizeConnection = await getConnection();
    models = importModels(sequelizeConnection, sequelize);

    // sync = true;
    const force = false;
    if (sync) await sequelizeConnection.sync({ force });

    models.Review.beforeUpdate((review, options) => {
      if (review.rating > 0 || review.rating <= 5) {
        throw new Error('Rating must be in range 1-5');
      }
    });
    models.Restaurant.beforeUpdate((restaurant, options) => {
      if (restaurant.pricing > 0 || restaurant.pricing <= 4) {
        throw new Error('Restaurant pricing mus be in range 1-4');
      }
    });

    // restaurant - user
    models.Restaurant.hasOne(models.User, { foreignKey: 'id' });
    models.Restaurant.belongsTo(models.User, { foreignKey: 'user_id' });

    // user - review
    models.Review.hasOne(models.User, { foreignKey: 'id' });
    models.Review.belongsTo(models.User, { foreignKey: 'user_id' });

    // restaurant - review
    models.Review.hasOne(models.Restaurant, { foreignKey: 'id' });
    models.Review.belongsTo(models.Restaurant, { foreignKey: 'restaurant_id' });

    console.log('DB models were successfully synchronized');
    return models;
  } catch (e) {
    console.error(e);
  }
}

module.exports = { initModels };
