const userServices = require("../services/user.service");
const tokenServices = require("../services/token.service");

const register = async (data) => {
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
  await tokenServices.deleteToken(refreshToken);
};

const refreshToken = async (username, password, refreshToken) => {
  const user = await userServices.doesExistAccount(username,password)
  const newAccessToken = tokenServices.generateAccessToken(user);
  const newRefreshToken = await tokenServices.updateToken(user,refreshToken);
  return { user, newAccessToken, newRefreshToken };
}

module.exports = {
  register,
  login,
  logout,
  refreshToken
};
