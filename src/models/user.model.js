const { DataTypes } = require('sequelize');
const db = require('../configs/database');
const { Token, ResultsUser } = require('./index');
const { role } = require("../constant/enum");

const Users = db.define('Users', {  
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey:true,
        allowNull: false
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: true,
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
    role: {
        type: DataTypes.ENUM,
        values: [role.ADMIN,role.USER],
        allowNull: false,
        defaultValue: role.USER
    },
    createdAt:  DataTypes.DATE,
    updatedAt: DataTypes.DATE
}, {
    freezeTableName: true
});

Users.hasOne(Token, { foreignKey: "user_id" });
Token.belongsTo(Users, { foreignKey: "user_id", targetKey: "id" });

Users.hasMany(ResultsUser, { foreignKey: "user_id" });
ResultsUser.belongsTo(Users, { foreignKey: "user_id", targetKey: 'id' });

Users.sync();

module.exports = Users;