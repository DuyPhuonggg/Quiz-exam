const httpStatus = require("http-status");
const User = require("../models/user.model");
const ApiError = require("../utils/ApiError");
const { Op } = require("sequelize");

//Create a user
const createUser = async (data) => {
  const {firstName, lastName, username, password, email, address } = data;
  return User.create({
    firstName : firstName,
    lastName: lastName,
    username: username,
    password: password,
    email: email,
    address: address
  });
};

//Get all user
const findAllUser = async (data) => {
  const users = await User.findAll({
    offset: 10,
    where: {
      name: "Users",
      [Op.or]: [
        { firstName: data.firstName },
        { email: data.email },
        { address: data.address }
      ]
    }
  });
  return users;
};

//Get user by id
const findUserById = async (id) => {
  return await User.findByPk(id);
};

// //update User by id
const updateUserById = async (userId, body) => {
  const user = await findUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not dound");
  }
  // const {firstName, lastName, username, password, email, address } = body;
  await user.update({
    firstName : body.firstName,
    lastName: body.lastName,
    username: body.username,
    password: body.password,
    email: body.email,
    address: body.address 
  }, { 
    where: {
      id: userId
    }
  });
  return user;
};

//delete user by id
const deleteUserById = async (userId) => {
  const user = await findUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  await user.destroy({
    where: {
      id: userId
    }
  });
};

module.exports = {
  createUser,
  findAllUser,
  findUserById,
  updateUserById,
  deleteUserById
};
