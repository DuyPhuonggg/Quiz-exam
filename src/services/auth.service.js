const userServices = require("../services/user.service");
const tokenServices = require("../services/token.service");
const { EXPRISE_TIME } = require("../constant/enum");
const bcrypt = require("bcrypt");

const register = async (data, clientId) => {
  const user = await userServices.createUser(data);
  if (!user) throw new Error("Cannot create user");
  const tokens = tokenServices.generateAuthToken(user);
  await tokenServices.saveToken(user, tokens.refresh.token, clientId);
  const { id, username, email } = user.toJSON();
  return { id, username, email, tokens };
};

const login = async (username, password, clientId) => {
  const user = await userServices.doesExistAccount(username, password);
  const tokens = tokenServices.generateAuthToken(user);
  await tokenServices.saveToken(user, tokens.refresh.token, clientId);
  return tokens;
};

const logout = async (userId, clientId) => {
  await tokenServices.deleteToken(userId, clientId);
};

const refreshToken = async (userId, clientId) => {
  const user = await userServices.findUserById(userId);
  if (user) {
    const newAccessToken = tokenServices.generateAccessToken(user);
    const newRefreshToken = await tokenServices.updateToken(userId, clientId);
    const { refresh_token } = newRefreshToken.toJSON();
    return {
      access: {
        token: newAccessToken,
        exprise_time: EXPRISE_TIME.ACCESS_TOKEN
      },
      refresh: {
        token: refresh_token,
        exprise_time: EXPRISE_TIME.REFRESH_TOKEN
      }
    };
  } else throw new Error("Not found User");
};

const forgotPassword = async(username) => {
  const newPassword = Math.floor(Math.random()*Math.pow(10,6));
  const convertNewPassord = newPassword.toString();
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(convertNewPassord, salt);
  const check = await userServices.updatePassword(username,hash);
  if(!check) throw new Error("Update Password Failed");
  else return convertNewPassord;
}

module.exports = {
  register,
  login,
  logout,
  refreshToken,
  forgotPassword
};
