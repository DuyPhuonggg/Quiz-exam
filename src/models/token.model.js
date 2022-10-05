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
    client_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    accessToken: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    refreshToken: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    createdAt:  DataTypes.DATE,
    expiredAt: DataTypes.DATE
}, {
    freezeTableName: true
});

Token.sync();

module.exports = Token;