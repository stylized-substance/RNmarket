import { Model, DataTypes } from 'sequelize';

import { sequelize } from '#src/utils/database';

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true
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
    },
    passwordhash: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  },
  {
    hooks: {
      // Omit password hash after user creation or password change so it doesn't get sent to frontend
      afterCreate: (record) => {
        delete record.dataValues.passwordhash;
      },
      afterUpdate: (record) => {
        delete record.dataValues.passwordhash;
      }
    },
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'User'
  }
);

export default User;
