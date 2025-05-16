'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Settings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Settings.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
      }); 
    }
  }
  Settings.init({
    PrimaryColor: DataTypes.STRING,
    SecondaryColor: DataTypes.STRING,
    Logo: DataTypes.STRING,
    BackgroundImage: DataTypes.STRING,
    AccueilContentPosition: DataTypes.STRING,
    FacebookLink: DataTypes.STRING,
    InstagramLink: DataTypes.STRING,
    LinkedinLink: DataTypes.STRING,
    TiktokLink: DataTypes.STRING,
    YoutubeLink: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Settings',
  });
  return Settings;
};