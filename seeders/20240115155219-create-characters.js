'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'tb_character',
      [
        {
          name: 'Hannyabal',
          avatar_max: 10,
        },
        {
          name: 'Aokiji',
          avatar_max: 25,
        },
        {
          name: 'Benn Beckman',
          avatar_max: 10,
        },
        {
          name: 'Zephyr',
          avatar_max: 9,
        },
        {
          name: 'Charlotte Perospero',
          avatar_max: 8,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tb_character', {});
  },
};
