module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.sequelize.query('SELECT NOW()');
    }),

  down: (queryInterface) =>
    queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.sequelize.query('SELECT NOW()');
    }),
};
