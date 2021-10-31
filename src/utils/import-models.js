const path = require('path');
const glob = require('glob');

function importModels(sequelizeConnection, sequelize) {
  const models = {};
  glob
    .sync('**/*.js', { cwd: path.join(__dirname, '../db/models') })
    .filter((dir) => dir !== 'index.js')
    .forEach((filename) => {
      const model = require(`../db/models/${filename}`);
      const modelName = filename.replace('.js', '');
      models[`${modelName}`] = model(sequelizeConnection, sequelize);
    });

  return models;
}

module.exports = { importModels };
