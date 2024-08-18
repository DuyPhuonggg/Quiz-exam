const Users = require("../models/users.model");
const pagination = require("../utils/pagination");
const bcrypt = require("bcrypt");
const cloudinary = require("../utils/cloudinary");

const createSingleUser = async (data) => {
    const salt = await bcrypt.genSalt(10);
    data.password = await bcrypt.hash(data.password, salt);
    return Users.create({...data});
};

const findByEmail = async (email, attributes = []) => {
    return await Users.findOne({
        attributes: { exclude: attributes },
        where: {email},
    })
}

const findAllUser = async (options) => {
    const {page, size} = options;
    const {limit, offset} = pagination.getPagination(
        parseInt(page),
        parseInt(size)
    );
    const users = await Users.findAndCountAll({
        limit: limit,
        offset: offset,
        attributes: ["id", "firstName", "lastName", "username", "email"]
    });
    const data = pagination.getPaginationData(users, page, size);
    return data;
};

const findById = async (id) => {return await Users.findByPk(id)};

const doesExistAccount = async (username, password) => {
    const user = await Users.findOne({
        attributes: ["id", "username", "password", "email", "role"],
        where: {username: username}
    });
    if (!user) throw new Error("Username Incorrect!");

    return user;
};

const updateById = async (userId, body, filePath) => {
    // const result = await cloudinary.uploader.upload(filePath);
    // body.profile_img = result.secure_url;
    // body.cloudinary_id = result.public_id;

    return await Users.update({...body}, {where: {id: userId}});
};

const updateByEmail = async (email, updateBody) => {
    return await Users.update(updateBody,{
        where: { email: email }
    });
};

const deleteUserById = async (userId) => {
    const user = await Users.findByPk(userId);
    if (!user) throw new Error("User Not Found");
    await user.destroy({where: {id: userId}});
};

module.exports = {
    createSingleUser,
    findAllUser,
    findById,
    doesExistAccount,
    updateById,
    updateByEmail,
    deleteUserById,
    findByEmail
};
