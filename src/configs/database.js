const { Sequelize } = require('sequelize');

const db = new Sequelize('quiz_exam', 'postgres', '123456', {
    host: 'localhost',
    dialect: 'postgres',
    operatorsAliases: false,
});

module.exports = db;