'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('tb_user_character', 'faction', {
      type: Sequelize.DataTypes.ENUM(...Object.values(['pirate', 'marine', 'revolutionary'])),
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('tb_user_character', 'faction');
  },
};
