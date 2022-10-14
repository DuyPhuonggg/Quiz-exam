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

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  saveToken
};
