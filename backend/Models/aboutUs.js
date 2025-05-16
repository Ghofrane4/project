'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AboutUs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      AboutUs.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
      });      
    }
  }
  AboutUs.init({
    Title: DataTypes.STRING,
    Description: DataTypes.STRING,
    BannerTitle: DataTypes.STRING,
    BannerDescription: DataTypes.STRING,
    BannerImage: DataTypes.STRING,
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true // Ensures each user can only have one AboutUs page
    }
  }, {
    sequelize,
    modelName: 'AboutUs',
  });
  return AboutUs;
};