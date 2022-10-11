const httpStatus = require("http-status");
const Token = require("../models/token.model");
const ApiError = require("../utils/ApiError");
const userService = require("../services/user.service");
const Users = require("../models/user.model");

const checkUsername = async (username) => {
  const checkUsername = await Users.findAll({
    where: {
      username: username
    }
  });
  return checkUsername;
};
const login = async (username, password) => {
  const user = await userService.findUserById(id);
  if (username != user.username) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect username");
  }
  if (!(await user.isPasswordMatch(password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect password");
  }
  return user;
};

const logout = async (userId) => {
  const tokens = await Token.findAll({
    where: {
      user_id: userId
    }
  });
  if (!tokens) {
    throw new ApiError(httpStatus.NOT_FOUND, "Not found");
  }
  await Token.destroy({
    where: {
      user_id: userId
    }
  });
};

module.exports = {
  checkUsername,
  login,
  logout
};
