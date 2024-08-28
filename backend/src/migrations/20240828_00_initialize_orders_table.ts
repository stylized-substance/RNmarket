import { DataTypes } from 'sequelize';

// Using ES5 export so Umzug can work with it
module.exports = {
  // @ts-expect-error - no type available for queryInterface
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable('orders', {
      id: {
        type: DataTypes.UUID,
        primaryKey: true
      },
      product_ids: {
        type: DataTypes.ARRAY(DataTypes.UUID),
        allowNull: false,
        references: { model: 'products', key: 'id' }
      },
      name: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: false
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
    await queryInterface.dropTable('orders');
  }
};
