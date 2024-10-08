const {ROLE, GENDER} = require("../constants/user.constant");
const Users = (db, DataTypes) => {
    return db.define(
        "Users",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            first_name: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            last_name: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            access_token: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            refresh_token: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            username: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    isEmail: true,
                    isLowercase: true,
                },
                unique: true,
            },
            role: {
                type: DataTypes.ENUM,
                values: [ROLE.ADMIN, ROLE.USER, ROLE.NONE],
                defaultValue: ROLE.NONE,
            },
            gender: {
                type: DataTypes.ENUM,
                values: [GENDER.MALE, GENDER.FEMALE, GENDER.UNKNOWN],
                allowNull: true,
            },
            phone_number: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            address: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            permissions: {
                type: DataTypes.ARRAY(DataTypes.STRING),
                allowNull: false,
                defaultValue: [],
            }
        },
        {
            freezeTableName: true,
            timestamps: true,
        }
    );
}

module.exports = Users;
