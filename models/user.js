'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    static associate(models) {



    }
  }
  User.init({
id:{
  type:DataTypes.INTEGER,
  primaryKey:true,
  autoIncrement:true
},
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    familyName: DataTypes.STRING,
    givenName: DataTypes.STRING,
    googleId: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    name: DataTypes.STRING,

  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};