const httpStatus = require("http-status");
const Token = require("../models/token.model");

const userServices = require("../services/user.service");
const tokenServices = require("../services/token.service");


const registor = async (data) => {
  const user = await userServices.createUser(data);
  if (!user) {
    throw new Error("Cannot create user");
  }
  const accessToken = tokenServices.generateAccessToken(user);
  const refreshToken = tokenServices.generateRefreshToken(user);
  await tokenServices.saveToken(user, refreshToken);
  return { user, accessToken, refreshToken };
};

const login = async (username, password) => {
  const user = await userServices.doesExistAccount(username,password); 
  const accessToken = tokenServices.generateAccessToken(user);
  const refreshToken = tokenServices.generateRefreshToken(user);
  await tokenServices.saveToken(user, refreshToken);
  return { user, accessToken, refreshToken };
};

const logout = async (refreshToken) => {
  const token = await Token.destroy({
    where: {
      refresh_token: refreshToken
    }
  });
  if (!token) {
    throw new ApiError(httpStatus.NOT_FOUND, "Not found");
  }
};

module.exports = {
  registor,
  login,
  logout
};
