const { DataTypes } = require('sequelize');
const db = require('../configs/database');

const User = db.define('Users', {  
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
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
        unique: true,
        validate: {
            is: ["^[a-z]+$",'i'],
            len: [1,50]
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            is: ["^[a-z]+$",'i'],
            len:[8,20]
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
            min:3,
        }
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    createdAt:  DataTypes.DATE(now()),
    updatedAt: DataTypes.DATE(now())
}, {
    freezeTableName: true
});

await User.sync({ alter: true }); //Create model

module.exports = User;