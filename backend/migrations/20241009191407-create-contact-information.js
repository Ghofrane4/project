'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ContactInformations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      NameText: {
        type: Sequelize.STRING
      },
      EmailText: {
        type: Sequelize.STRING
      },
      SubjectText: {
        type: Sequelize.STRING
      },
      MessageText: {
        type: Sequelize.STRING
      },
      ButtonText: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
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
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ContactInformations');
  }
};