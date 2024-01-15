'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'tb_user_role',
      [
        {
          name: 'admin',
          user_id: '7b0b1773-9c53-47d9-92c4-54fbb779d8e2',
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tb_user_role', {
      name: 'admin',
      user_id: '7b0b1773-9c53-47d9-92c4-54fbb779d8e2',
    });
  },
};
