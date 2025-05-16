'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('SectionContents', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      AccueilTitle: {
        type: Sequelize.STRING
      },
      AccueilDescription: {
        type: Sequelize.STRING
      },
      ProductTitle: {
        type: Sequelize.STRING
      },
      ProductDescription: {
        type: Sequelize.STRING
      },
      ServiceTitle: {
        type: Sequelize.STRING
      },
      ServiceDescription: {
        type: Sequelize.STRING
      },
      ContactTitle: {
        type: Sequelize.STRING
      },
      ContactDescription: {
        type: Sequelize.STRING
      },
      HomeNameLink: {
        type: Sequelize.STRING
      },
      AboutUsNameLink: {
        type: Sequelize.STRING
      },
      ProductNameLink: {
        type: Sequelize.STRING
      },
      ServiceNameLink: {
        type: Sequelize.STRING
      },
      ContactNameLink: {
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
    await queryInterface.dropTable('SectionContents');
  }
};