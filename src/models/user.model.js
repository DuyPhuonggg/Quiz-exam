const { DataTypes } = require('sequelize');
const db = require('../configs/database');

//define model
const Users = db.define('Users', {  
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
            len:[3,20]
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
    gender:  DataTypes.STRING,
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    createdAt:  DataTypes.DATE(now()),
    updatedAt: DataTypes.DATE(now())
}, {
    freezeTableName: true
});

await Users.sync({ alter: true }); //Create model
//Drop model
// const users_down = await Users.drop();

module.exports = Users;