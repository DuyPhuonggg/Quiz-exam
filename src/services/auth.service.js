const userServices = require("../services/user.service");
const tokenServices = require("../services/token.service");

const register = async (data, clientId) => {
  const user = await userServices.createUser(data);
  if (!user) throw new Error("Cannot create user");
  const accessToken = tokenServices.generateAccessToken(user);
  const refreshToken = tokenServices.generateRefreshToken(user);
  await tokenServices.saveToken(user, refreshToken, clientId);
  return { user, accessToken, refreshToken };
};

const login = async (username, password, clientId) => {
  const user = await userServices.doesExistAccount(username, password);
  const accessToken = tokenServices.generateAccessToken(user);
  const refreshToken = tokenServices.generateRefreshToken(user);
  await tokenServices.saveToken(user, refreshToken, clientId);
  return { accessToken, refreshToken };
};

const logout = async (userId, clientId) => {
  await tokenServices.deleteToken(userId, clientId);
};

const refreshToken = async (userId, clientId) => {
  const user = await userServices.findUserById(userId);
  if (user) {
    const newAccessToken = tokenServices.generateAccessToken(user);
    const newRefreshToken = await tokenServices.updateToken(userId, clientId);
    return { newAccessToken, newRefreshToken };
  } else throw new Error("Not found User");
};

module.exports = {
  register,
  login,
  logout,
  refreshToken
};
