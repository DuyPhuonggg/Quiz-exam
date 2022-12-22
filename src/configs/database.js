const { Sequelize } = require("sequelize");
require("dotenv").config();
const USERNAME = "postgres";

const db = new Sequelize(process.env.DATABASE, USERNAME, process.env.PASSWORD, {
  host: process.env.HOST,
  dialect: process.env.TYPE,
  operatorsAliases: false
});

module.exports = db;
