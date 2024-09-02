import { Model, DataTypes } from 'sequelize';

import { sequelize } from '#src/utils/database';

class Order extends Model {}

Order.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'Order'
  }
);

export default Order;