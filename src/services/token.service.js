const jwt = require("jsonwebtoken");
require("dotenv").config();
const Token = require("../models/token.model");

const generateAccessToken = (user) => {
  const payload = {
    aud: user.id,
    role: user.role,
    expiresIn: "1h"
  };
  const secret = process.env.ACCESS_TOKEN_SECRET;
  const JWT = jwt.sign(payload, secret);
  return JWT;
};

const generateRefreshToken = (user) => {
  const payload = {
    aud: user.id,
    role: user.role,
    expiresIn: "1d"
  };
  const secret = process.env.ACCESS_TOKEN_SECRET;
  const JWT = jwt.sign(payload, secret);
  return JWT;
};

const saveToken = async (user, refreshToken) => {
  const token = await Token.create({
    user_id: user.id,
    refresh_token: refreshToken,
    expired_in: 1
  });
  return token;
};

const updateToken = async (user, refreshToken) => {
  const token = await Token.findOne({
    where: { refresh_token : refreshToken }
  });
  if (!token) throw new Error("Not Found Token");
  const newRefreshToken = generateRefreshToken(user);
  return await token.update({
    user_id: user.id,
    refresh_token: newRefreshToken,
    expired_in: 1
  });
};

const deleteToken = async (refreshToken) => {
  const token = await Token.findOne({
    where: { refresh_token : refreshToken }
  })
  if (!token) {
    throw new Error("Not Found");
  }
  await token.destroy();
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  saveToken,
  updateToken,
  deleteToken
};
