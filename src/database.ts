import { Sequelize } from 'sequelize';

const database = new Sequelize(
  process.env.DATABASE_NAME as string,
  process.env.DATABASE_USER as string,
  process.env.DATABASE_PASSWORD,
  {
    dialect: 'postgres',
    host: process.env.DATABASE_HOST,
    port: +(process.env.DATABASE_PORT as string),
    dialectOptions: {
      timezone: 'America/Sao_Paulo',
    },
    logging: process.env.DATABASE_LOG === 'true',
    sync: {
      alter: process.env.DATABASE_SYNC_ALTER === 'true',
    },
    hooks: {
      beforeSync: async options => {
        await database.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";', options);
      },
    },
  }
);

export default database;
