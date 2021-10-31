module.exports = (sequelize, Sequelize) => {
  return sequelize.define(
    'users',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING(60),
        allowNull: true,
      },
      status: {
        type: Sequelize.ENUM,
        values: ['active', 'inactive', 'deleted'],
        defaultValue: 'active',
        allowNull: false,
      },
      login: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      password: {
        type: Sequelize.STRING(300),
        allowNull: true,
      },
      email: { type: Sequelize.STRING, allowNull: true },
      phone: { type: Sequelize.STRING, allowNull: true },
      refresh_token: {
        type: Sequelize.STRING,
        allowNull: true,
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
      tablename: 'users',
    }
  );
};
