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

const logout = async (refreshToken) => {
  const tokens = await Token.destroy({
    where: {
      refresh_token: refreshToken
    }
  });
  if (!tokens) {
    throw new ApiError(httpStatus.NOT_FOUND, "Not found");
  }
  
};

module.exports = {
  checkUsername,
  login,
  logout
};
