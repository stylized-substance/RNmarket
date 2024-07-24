import { Model, DataTypes } from 'sequelize';

import { sequelize } from '#src/utils/database';

class Product extends Model {}

Product.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    original_id: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    category: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    imgs: {
      type: DataTypes.ARRAY(DataTypes.TEXT)
    },
    specs: {
      type: DataTypes.ARRAY(DataTypes.TEXT)
    },
    instock: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    eta: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    popular: {
      type: DataTypes.BOOLEAN
    },
    brand: {
      type: DataTypes.TEXT
    },
    ram: {
      type: DataTypes.TEXT
    },
    language: {
      type: DataTypes.TEXT
    },
    genre: {
      type: DataTypes.TEXT
    },
    for: {
      type: DataTypes.TEXT
    },
    type: {
      type: DataTypes.TEXT
    },
    processor: {
      type: DataTypes.TEXT
    },
    displaysize: {
      type: DataTypes.TEXT
    },
    has_ssd: {
      type: DataTypes.TEXT
    }
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'Product'
  }
);

export default Product;
