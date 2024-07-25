import { Model, DataTypes } from 'sequelize';

import { sequelize } from '#src/utils/database';

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    username: {
      type: DataTypes.TEXT,
      unique: true,
      validate: {
        isEmail: true
      },
      allowNull: false
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'Product'
  }
);

export default User;
