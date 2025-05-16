// migrations/XXXXXX-add-createdBy-to-products.js
'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn('Products', 'createdBy', {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'Users', // Assumes Users model exists
                key: 'id'
            }
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn('Products', 'createdBy');
    }
};
