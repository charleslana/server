'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('tb_user_character', 'sea', {
      type: Sequelize.DataTypes.ENUM(...Object.values(['north', 'east', 'south', 'west'])),
    });
    await queryInterface.addColumn('tb_user_character', 'breed', {
      type: Sequelize.DataTypes.ENUM(
        ...Object.values(['human', 'dwarf', 'giant', 'triton', 'cyborg'])
      ),
    });
    await queryInterface.addColumn('tb_user_character', 'class', {
      type: Sequelize.DataTypes.ENUM(...Object.values(['swordsman', 'shooter', 'fighter'])),
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('tb_user_character', 'sea');
    await queryInterface.removeColumn('tb_user_character', 'breed');
    await queryInterface.removeColumn('tb_user_character', 'class');
  },
};
