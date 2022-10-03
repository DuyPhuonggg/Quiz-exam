const { Sequelize } = require('sequelize');

module.exports = new Sequelize('quiz_exam', 'postgres', '123456', {
    host: 'localhost',
    dialect: 'postgres',
    operatorsAliases: false,

});