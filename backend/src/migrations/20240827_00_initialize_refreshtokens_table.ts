import { DataTypes } from 'sequelize';

// Using ES5 export so Umzug can work with it
module.exports = {
  // @ts-expect-error - no type available for queryInterface
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable('refreshtokens', {
      token: {
        type: DataTypes.UUID,
        primaryKey: true
      },
      expiryDate: {
        type: DataTypes.DATE,
        allowNull: false
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: 'users', key: 'id' }
      }
    });
  },
  // @ts-expect-error - no type available for queryInterface
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('refreshtokens');
  }
};
