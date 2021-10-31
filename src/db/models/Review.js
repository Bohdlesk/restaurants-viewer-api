module.exports = (sequelize, Sequelize) => {
  return sequelize.define(
    'reviews',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      restaurant_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        onDelete: 'set null',
        references: {
          model: 'restaurants',
          key: 'id',
        },
      },
      name: {
        type: Sequelize.STRING(60),
        allowNull: true,
      },
      review_text: {
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
      rating: { type: Sequelize.INTEGER, allowNull: false },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        onDelete: 'set null',
        references: {
          model: 'users',
          key: 'id',
        },
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
      tablename: 'reviews',
    }
  );
};
