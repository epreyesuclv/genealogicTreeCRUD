const { Model, DataTypes } = require("sequelize");
const { Person } = require("./Person");
const { sequelize } = require("./index");

// child's Model
/**    
Child
    -ID(string, required)
    -Name(string, minLength:20, maxLength:150)
    -PersonID
 */

class Child extends Model {}

Child.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(150),
    },
    personID: {
      type: DataTypes.STRING,
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
      references: {
        model: Person,
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "Child",
  }
);

module.exports = { Child };
