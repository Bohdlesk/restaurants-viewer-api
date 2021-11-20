module.exports = (sequelize, Sequelize) => {
  return sequelize.define(
    'arduino',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      data: {
        type: Sequelize.STRING(500),
        allowNull: true,
      },
      temp: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      humidify: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      light: { type: Sequelize.STRING(20), allowNull: true },
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
      tablename: 'arduino',
    }
  );
};
