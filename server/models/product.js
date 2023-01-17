'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.Category, {
        foreignKey : 'categoryId'
      })
      Product.belongsTo(models.User, {
        foreignKey : 'authorId'
      })
      Product.hasMany(models.UserProduct)
    }
  }
  Product.init({
    id : {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {
          msg : `Name can't be empty`
        },
        notEmpty : {
          msg : `Name can't be empty`
        }
      }
    },
    description: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {
          msg : `Description can't be empty`
        },
        notEmpty : {
          msg : `Description can't be empty`
        }
      }
    },
    price: {
      type : DataTypes.INTEGER,
      allowNull : false,
      validate : {
        notNull : {
          msg : `Price can't be empty`
        },
        notEmpty : {
          msg : `Price can't be empty`
        },
        min : {
          args : [10000],
          msg : `Minimum Price is 10000`
        }
      }
    },
    stock: {
      type : DataTypes.INTEGER,
      allowNull : false,
      validate : {
        notEmpty : {
          msg : `Stock can't be empty`
        },
        notNull : {
          msg : `Stock can't be empty`
        },
        min : {
          args : [1],
          msg : `Minimum Stock is 1`
        }
      }
    },
    imgUrl: DataTypes.STRING,
    categoryId: DataTypes.INTEGER,
    authorId: DataTypes.INTEGER,
    status : DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};