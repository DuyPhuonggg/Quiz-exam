const { DataTypes } = require('sequelize');
const db = require('../configs/database');

const Users = db.define('Users', {  
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey:true,
        allowNull: false
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    createdAt:  DataTypes.DATE,
    updatedAt: DataTypes.DATE
}, {
    freezeTableName: true
});

Users.sync();

module.exports = Users;