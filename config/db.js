import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false,         // disable SQL query logging in production
    pool: {
      max: 10,              // max connections in pool
      min: 0,
      acquire: 30000,       // max ms to wait for a connection
      idle: 10000,          // release connection after 10s idle
    },
  }
);

export default sequelize;