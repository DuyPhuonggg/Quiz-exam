const db = require('../configs/database');
const { DataTypes } = require('sequelize');

const Token = db.define('Token',{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey:true,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    refreshToken: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    createdAt:  DataTypes.DATE,
}, {
    freezeTableName: true
});

Token.sync();

module.exports = Token;