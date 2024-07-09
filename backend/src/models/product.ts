import { Model, DataTypes } from 'sequelize';

import { sequelize } from '#src/utils/database';

class Product extends Model {}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
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
    images: {
      type: DataTypes.ARRAY(DataTypes.TEXT)
    },
    specs: {
      type: DataTypes.ARRAY(DataTypes.TEXT)
    },
    inStock: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    eta: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    productId: {
      type: DataTypes.TEXT,
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

export default { Product };
