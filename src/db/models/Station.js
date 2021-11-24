module.exports = (sequelize, Sequelize) => {
  return sequelize.define(
    'stations',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      sid: {
        type: Sequelize.STRING(100),
        allowNull: true,
        unique: true,
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
      last_connection: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: null,
      },
      receive_data: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
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
      tablename: 'stations',
    }
  );
};
