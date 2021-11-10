const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("./index");

//person's Model

/**Person
    -ID(string, required)
    -Name(string, minLength:20, maxLength:150)
    -Lastname(string, maxLength:150)
    -Gender(required, enum[Male,Famale,Others])
    -Married(bool)
    -Age(number)
 */

class Person extends Model {}
Person.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },
    lastName: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },
    gender: {
      type: DataTypes.ENUM(["Male", "Famale", "Other"]),
      allowNull: false,
    },
    married: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    age: {
      type: DataTypes.NUMBER,
    },
  },
  {
    sequelize,
    modelName: "Person",
  }
);

module.exports = {
  Person
};
