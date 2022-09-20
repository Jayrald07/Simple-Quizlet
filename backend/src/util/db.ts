import { Sequelize } from "sequelize";

const { DB_HOST, DB_NAME, DB_USERNAME, DB_PASSWORD } = process.env;

export default new Sequelize({
  host: DB_HOST,
  database: DB_NAME,
  password: DB_PASSWORD,
  username: DB_USERNAME,
  dialect: "mysql",
});
