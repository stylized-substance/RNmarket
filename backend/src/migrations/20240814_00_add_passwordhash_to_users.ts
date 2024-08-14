import { DataTypes } from 'sequelize';

// Using ES5 export so Umzug can work with it
module.exports = {
  // @ts-expect-error - no type available for queryInterface
  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn('users', 'passwordhash', {
      type: DataTypes.TEXT,
      allowNull: true
    });
  },
  // @ts-expect-error - no type available for queryInterface
  down: async ({ context: queryInterface }) =>
    queryInterface.removeColumn('users', 'passwordhash')
};
