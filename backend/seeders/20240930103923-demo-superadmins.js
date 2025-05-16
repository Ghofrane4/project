const bcrypt = require('bcrypt');
const saltRounds = 10;


module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Superadmins', [
      {
        fullname: 'Jasser Ben saad',
        email: 'jasser@example.com',
        password: bcrypt.hashSync('pass', saltRounds),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Superadmins', null, {});
  },
};