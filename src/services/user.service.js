const httpStatus = require("http-status");
const User = require("../models/user.model");
const ApiError = require("../utils/ApiError");
const { Op } = require("sequelize");

//Create a user
const createUser = async (data) => {
  return User.create(data);
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
  return await User.findById(id);
};

//update User by id
const updateUserById = async (userId, body) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not dound");
  }
  if (body.email && (await User.isEmailTaken(body.email, userId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
  }
  Object.assign(user, body);
  await user.update();
  return user;
};

//delete user by id
const deleteUserById = async (userId) => {
  const user = await getUserById(userId);
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
