"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Service extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Service.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
      });
    }
  }
  Service.init(
    {
      Title: DataTypes.STRING,
      Description: DataTypes.STRING,
      Icon: DataTypes.STRING,
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
        onDelete: "CASCADE",
      },
    },
    {
      sequelize,
      modelName: "Service",
    }
  );
  return Service;
};
