const db = require('../configs/database');
const DataTypes = require('sequelize');

const Token = db.define({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
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
    createdAt:  DataTypes.DATE(now()),
    expiredAt: DataTypes.DATE(now())
}, {
    freezeTableName: true
});

await Token.sync({ alter : true});

module.exports = Token;