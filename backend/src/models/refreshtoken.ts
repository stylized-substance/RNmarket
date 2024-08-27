import { Model, DataTypes } from 'sequelize';

import { sequelize } from '#src/utils/database';

class RefreshToken extends Model {}

RefreshToken.init(
  {
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
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'RefreshToken'
  }
);

export default RefreshToken;
