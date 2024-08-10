const userServices = require("../services/user.service");
const { EXPIRE_TIME } = require("../constants/enum");
const bcrypt = require("bcrypt");

const register = async (data,) => {
  const user = await userServices.createUser(data);

  if (!user) throw new Error("Cannot create user");


  const { id, username, email } = user.toJSON();
  return { id, username, email };
};

const login = async (username, password, clientId) => {
  const user = await userServices.doesExistAccount(username, password);
  // const tokens = tokenServices.generateAuthToken(user);
  // await tokenServices.saveToken(user, tokens.refresh.token, clientId);
  return "tokens";
};

const logout = async (userId, clientId) => {
  await tokenServices.deleteToken(userId, clientId);
};

const refreshToken = async (userId, clientId) => {
  const user = await userServices.findUserById(userId);
  if (user) {


    const { refresh_token } = "newRefreshToken".toJSON();
    return {
      access: {
        token: "newAccessToken",
        exprise_time: EXPIRE_TIME.ACCESS_TOKEN
      },
      refresh: {
        token: refresh_token,
        exprise_time: EXPIRE_TIME.REFRESH_TOKEN
      }
    };
  } else throw new Error("Not found User");
};

const forgotPassword = async (username) => {
  const newPassword = Math.floor(Math.random() * Math.pow(10, 6));
  const convertNewPassord = newPassword.toString();
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(convertNewPassord, salt);
  const check = await userServices.updatePassword(username, hash);
  if (!check) throw new Error("Update Password Failed");
  else return convertNewPassord;
};

module.exports = {
  register,
  login,
  logout,
  refreshToken,
  forgotPassword
};
