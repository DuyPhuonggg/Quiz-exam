const httpStatus = require("http-status");
const Token  = require("../models/token.model");
const ApiError = require("../utils/ApiError");
const { Op } = require("sequelize");
const userService = require('../services/user.service');
const Users = require("../models/user.model");

const checkUsername = async(username) => {
    const checkUsername = await Users.findAll({
      where: {
          username: username
      }
    });
    return checkUsername
}
const login = async (username, password) => {
    const user = await userService.findUserById(id);
    if (username != user.username) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect username');
    }
    if (!(await user.isPasswordMatch(password))) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect password');
    }
    return user;
};

const logout = async (refreshToken) => {
  const refreshTokenDoc = await Token.findOne({ token: refreshToken });
  if(!refreshTokenDoc) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Not found');
  }
  await refreshTokenDoc.remove();
}

module.exports = {
  checkUsername,
  login,
  logout
}
