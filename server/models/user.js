'use strict';
const {
  Model
} = require('sequelize');
const { encrypt } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Product,{
        foreignKey : 'authorId'
      })
      User.hasMany(models.UserProduct)
    }
  }
  User.init({
    username: {
      type : DataTypes.STRING,
      allowNull : false,
      unique : {
        msg : `Username already registered`
      },
      validate : {
        notEmpty : {
          msg : `Username is required`
        },
        notNull : {
          msg : `Username is required`
        }      
      }
    },
    email: {
      type : DataTypes.STRING,
      allowNull : false,
      unique : {
        msg : `Email already registered`
      },
      validate : {
        notEmpty : {
          msg : `Email is required`
        },
        notNull : {
          msg : `Email is required`
        },
        isEmail : {
          msg : `Email format is wrong`
        }        
      }
    },
    password: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notEmpty : {
          msg : `Password is required`
        },
        notNull : {
          msg : `Password is required`
        },
        len : {
          args :[5,70],
          msg : `minimum characters password is 5 and maximum is 32`
        }
      }
    },
    role: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate((user) =>{
    user.password = encrypt(user.password)
    user.role = 'admin'
  })
  return User;
};