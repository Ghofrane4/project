'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Settings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      PrimaryColor: {
        type: Sequelize.STRING
      },
      SecondaryColor: {
        type: Sequelize.STRING
      },
      Logo: {
        type: Sequelize.STRING
      },
      BackgroundImage: {
        type: Sequelize.STRING
      },
      AccueilContentPosition: {
        type: Sequelize.STRING
      },
      FacebookLink: {
        type: Sequelize.STRING
      },
      InstagramLink: {
        type: Sequelize.STRING
      },
      LinkedinLink: {
        type: Sequelize.STRING
      },
      TiktokLink: {
        type: Sequelize.STRING
      },
      YoutubeLink: {
        type: Sequelize.STRING
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique:true,
        references: {
          model: 'Users', // The model the foreign key refers to
          key: 'id'
        },
        onDelete: 'CASCADE', // Optional, but ensures that deleting a User deletes AboutUs
        onUpdate: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Settings');
  }
};