"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Field extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Noun.hasMany(models.Field, {
        foreignKey: {
          name: "nounId",
          allowNull: false,
        },
      });
    }
  }
  Field.init(
    {
      nounId: DataTypes.INTEGER,
      type: DataTypes.STRING,
      columnName: DataTypes.STRING,
      friendlyName: DataTypes.STRING,
      activeStatus: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Field",
    }
  );
  return Field;
};
