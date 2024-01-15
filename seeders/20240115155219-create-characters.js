'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'tb_character',
      [
        {
          name: 'Hannyabal',
        },
        {
          name: 'Aokiji',
        },
        {
          name: 'Benn Beckman',
        },
        {
          name: 'Zephyr',
        },
        {
          name: 'Charlotte Perospero',
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tb_character', {});
  },
};
