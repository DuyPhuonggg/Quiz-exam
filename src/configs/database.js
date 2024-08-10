const { Sequelize } = require("sequelize");
require("dotenv").config();

const USERNAME = process.env.DB_USERNAME || 'postgres';
const PASSWORD = process.env.DB_PASSWORD || '123456';

const db = new Sequelize(process.env.DB_NAME, USERNAME, PASSWORD, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_TYPE
});

module.exports = db;
