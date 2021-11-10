const { Model, DataTypes } = require("sequelize");

const { sequelize } = require("./index");

class User extends Model {}

User.init(
  {
    name: {
      type: DataTypes.STRING,
    },

    email: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    pass: {
      type: DataTypes.TEXT,
    },
    token: {
      type: DataTypes.TEXT,
    },
  },
  {
    sequelize,
    modelName: "User"
  }
);
module.exports = {
  User
};
