const jwt = require("jsonwebtoken");
require("dotenv").config();
const Token = require("../models/token.model");
const userServices = require("../services/user.service");
const { EXPRISE_TIME } = require("../constant/enum");

const generateAccessToken = (user) => {
  const payload = {
    aud: user.id,
    role: user.role,
    expiresIn: EXPRISE_TIME.ACCESS_TOKEN
  };
  const secret = process.env.ACCESS_TOKEN_SECRET;
  return jwt.sign(payload, secret);
};

const generateRefreshToken = (user) => {
  const payload = {
    aud: user.id,
    role: user.role,
    expiresIn: EXPRISE_TIME.REFRESH_TOKEN
  };
  const secret = process.env.ACCESS_TOKEN_SECRET;
  return jwt.sign(payload, secret);
};

const generateAuthToken = (user) => {
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);
  return {
    access: {
      token: accessToken,
      exprise_time: EXPRISE_TIME.ACCESS_TOKEN
    },
    refresh: {
      token: refreshToken,
      exprise_time: EXPRISE_TIME.REFRESH_TOKEN
    }
  };
};

const saveToken = async (user, refreshToken, clientId) => {
  const oldToken = await Token.findOne({
    where: {
      user_id: user.id,
      client_id: clientId
    }
  });
  if (!oldToken) {
    const token = await Token.create({
      user_id: user.id,
      client_id: clientId,
      refresh_token: refreshToken,
      expired_in: EXPRISE_TIME.REFRESH_TOKEN
    });
    return token;
  } else throw new Error("Already login");
};

const updateToken = async (userId, clientId) => {
  const token = await Token.findOne({
    where: {
      user_id: userId,
      client_id: clientId
    }
  });
  if (!token) throw new Error("Not Found Token");
  const user = await userServices.findUserById(userId);
  if (!user) throw new Error("Not Found User");
  const newRefreshToken = generateRefreshToken(user);
  return await token.update({
    user_id: userId,
    client_id: clientId,
    refresh_token: newRefreshToken,
    expired_in: EXPRISE_TIME.REFRESH_TOKEN
  });
};

const deleteToken = async (userId, clientId) => {
  const token = await Token.findOne({
    where: {
      user_id: userId,
      client_id: clientId
    }
  });
  if (token) await token.destroy();
  else throw new Error("Not Found Token");
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  generateAuthToken,
  saveToken,
  updateToken,
  deleteToken
};
