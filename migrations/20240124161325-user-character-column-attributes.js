'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('tb_user_character', 'strength', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1,
    });
    await queryInterface.addColumn('tb_user_character', 'dexterity', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1,
    });
    await queryInterface.addColumn('tb_user_character', 'intelligence', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1,
    });
    await queryInterface.addColumn('tb_user_character', 'resistance', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1,
    });
    await queryInterface.addColumn('tb_user_character', 'attribute_point', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('tb_user_character', 'strength');
    await queryInterface.removeColumn('tb_user_character', 'dexterity');
    await queryInterface.removeColumn('tb_user_character', 'intelligence');
    await queryInterface.removeColumn('tb_user_character', 'resistance');
    await queryInterface.removeColumn('tb_user_character', 'attribute_point');
  },
};
