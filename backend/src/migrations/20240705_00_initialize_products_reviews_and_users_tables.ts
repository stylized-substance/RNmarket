import { DataTypes } from 'sequelize';

// Using ES5 export so Umzug can work with it
module.exports = {
  // @ts-expect-error - no type available for queryInterface
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable('products', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
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
    });
    await queryInterface.createTable('users', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
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
    });
    await queryInterface.createTable('reviews', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      product_id: {
        type: DataTypes.TEXT,
        allowNull: false,
        references: { model: 'products', key: 'original_id' }
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' }
      },
      name: {
        type: DataTypes.TEXT
      },
      title: {
        type: DataTypes.TEXT
      },
      content: {
        type: DataTypes.TEXT
      },
      rating: {
        type: DataTypes.INTEGER
      }
    });
  },
  // @ts-expect-error - no type available for queryInterface
  down: async ({ context: queryInterface }) => {
    for (const table of ['products', 'reviews', 'users']) {
      await queryInterface.dropTable(table);
    }
  }
};
