'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const [user] = await queryInterface.bulkInsert(
      'tb_user',
      [
        {
          username: 'test',
          password: '$2b$10$P5iS484pNhn0beMaYlD8UuZfBPLYDCZnVDEKiIHsCN4SnLbpZ4M2C',
          email: 'test@test.com',
          full_name: 'test name',
          gender: 'male',
        },
      ],
      { returning: ['id'] }
    );
    await queryInterface.bulkInsert(
      'tb_user_role',
      [
        {
          name: 'user',
          user_id: user.id,
        },
        {
          name: 'admin',
          user_id: user.id,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    const adminRole = await queryInterface.sequelize.query(
      'SELECT user_id FROM tb_user_role WHERE name = :name LIMIT 1',
      {
        replacements: { name: 'admin' },
        type: Sequelize.QueryTypes.SELECT,
      }
    );
    const userId = adminRole[0]?.user_id;
    if (userId) {
      await queryInterface.bulkDelete('tb_user', { id: userId });
    } else {
      console.error('User with admin role not found.');
    }
  },
};
