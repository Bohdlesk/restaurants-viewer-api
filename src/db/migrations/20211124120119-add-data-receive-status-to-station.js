module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.addColumn(
        'stations',
        'receive_data',
        {
          type: Sequelize.BOOLEAN,
          defaultValue: true,
        },
        {
          transaction: t,
        }
      );
    }),

  down: (queryInterface) =>
    queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.removeColumn('stations', 'receive_data', {
        transaction: t,
      });
    }),
};
