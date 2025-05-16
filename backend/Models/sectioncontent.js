'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SectionContent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      SectionContent.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
      }); 
    }
  }
  SectionContent.init({
    AccueilTitle: DataTypes.STRING,
    AccueilDescription: DataTypes.STRING,
    ProductTitle: DataTypes.STRING,
    ProductDescription: DataTypes.STRING,
    ServiceTitle: DataTypes.STRING,
    ServiceDescription: DataTypes.STRING,
    ContactTitle: DataTypes.STRING,
    ContactDescription: DataTypes.STRING,
    HomeNameLink: DataTypes.STRING,
    AboutUsNameLink: DataTypes.STRING,
    ProductNameLink: DataTypes.STRING,
    ServiceNameLink: DataTypes.STRING,
    ContactNameLink: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'SectionContent',
  });
  return SectionContent;
};