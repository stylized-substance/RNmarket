import { Model } from 'sequelize';

import { sequelize } from '#src/utils/database';

class ProductOrder extends Model {}

// This is a model for the junction table connecting products to orders and vice versa
ProductOrder.init(
  {},
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'ProductOrder'
  }
);

export default ProductOrder;