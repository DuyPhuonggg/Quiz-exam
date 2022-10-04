const { DataTypes } = require('sequelize');
const db = require('../configs/database');

//define model
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

/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
User.statics.isEmailTaken = async function (email, excludeUserId) {
    const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
    return !!user;
};


module.exports = User;