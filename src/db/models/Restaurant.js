module.exports = (sequelize, Sequelize) => {
  return sequelize.define(
    'restaurants',
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
      address: {
        type: Sequelize.STRING(100),
        allowNull: true,
        defaultValue: null,
      },
      status: {
        type: Sequelize.ENUM,
        values: ['active', 'inactive', 'deleted'],
        defaultValue: 'active',
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
        onDelete: 'set null',
        allowNull: true,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      web_site: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      pricing: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: null,
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
      tablename: 'restaurants',
    }
  );
};
