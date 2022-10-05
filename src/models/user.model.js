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
    createdAt:  DataTypes.DATE,
    updatedAt: DataTypes.DATE
}, {
    freezeTableName: true
});

// (async function() {
//     // await sequelize.sync({ alter: true }).then(() => { // alter to edit DB after run server
//     await db.sync().then(() => {
//     //   logger.info("Sync users Table success!");
//     });
//   })().catch((error) => {
//     // logger.error("Sync users Table fail");
//     // logger.error(error);
//   });
 Users.sync();

module.exports = Users;