const httpStatus = require("http-status");
const Users = require("../models/user.model");
const ApiError = require("../utils/ApiError");
const { Op } = require("sequelize");

const createUser = async (data) => {
  return Users.create({
    firstName : data.firstName,
    lastName: data.lastName,
    username: data.username,
    password: data.password,
    email: data.email,
    role: data.role
  });
};

const findAllUser = async () => {
  const users = await Users.findAll({
    limit: 10,
    attributes: [
      'id',
      'username',
      'password',
      'email'
    ]
  });
  return users;
};


const findUserById = async (id) => {
  const user = await Users.findByPk(id);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  return user;
};

const updateUserById = async (userId, body) => {
  const user = await Users.findByPk(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  return await user.update({
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
};

const deleteUserById = async (userId) => {
  const user = await Users.findByPk(userId);
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
