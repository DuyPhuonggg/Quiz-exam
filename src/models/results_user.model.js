const { DataTypes } = require('sequelize');
const db = require('../configs/database');

const ResultsUser = db.define('Results User', {  
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey:true,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    correct_answers: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    no_answers: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    score_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    createdAt:  DataTypes.DATE,
    updatedAt: DataTypes.DATE
}, {
    freezeTableName: true
});

ResultsUser.sync();

module.exports = ResultsUser;