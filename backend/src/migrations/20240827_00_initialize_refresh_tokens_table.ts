import { DataTypes } from 'sequelize';

// Using ES5 export so Umzug can work with it
module.exports = {
  // @ts-expect-error - no type available for queryInterface
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable('refresh_tokens', {
      id: {
        type: DataTypes.UUID,
        primaryKey: true
      },
      token: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      expiry_date: {
        type: DataTypes.DATE,
        allowNull: false
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true,
        references: { model: 'users', key: 'id' }
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: new Date()
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: new Date()
      }
    });
  },
  // @ts-expect-error - no type available for queryInterface
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('refresh_tokens');
  }
};
