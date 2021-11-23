module.exports = (sequelize, Sequelize) => {
  return sequelize.define(
    'humidity',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      data: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      station_id: {
        type: Sequelize.INTEGER,
        onDelete: 'set null',
        allowNull: true,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      received: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    },
    {
      charset: 'utf8',
      collate: 'utf8_general_ci',
      freezeTableName: true,
      timestamps: true,
      tablename: 'humidity',
    }
  );
};
