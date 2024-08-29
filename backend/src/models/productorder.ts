import { Model, DataTypes } from 'sequelize';

import { sequelize } from '#src/utils/database';

class ProductOrder extends Model {}

// This is a model for the junction table connecting products to orders and vice versa
ProductOrder.init(
  {
    product_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: 'products', key: 'id' }
    },
    order_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: 'orders', key: 'id' }
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'ProductOrder'
  }
);

export default ProductOrder;