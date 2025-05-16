'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ContactInformation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ContactInformation.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
      }); 
    }
  }
  ContactInformation.init({
    NameText: DataTypes.STRING,
    EmailText: DataTypes.STRING,
    SubjectText: DataTypes.STRING,
    MessageText: DataTypes.STRING,
    ButtonText: DataTypes.STRING,
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true // Ensures each user can only have one AboutUs page
    }
  }, {
    sequelize,
    modelName: 'ContactInformation',
  });
  return ContactInformation;
};