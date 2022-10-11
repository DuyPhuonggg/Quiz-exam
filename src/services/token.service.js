const jwt = require('jsonwebtoken');
require('dotenv').config();
const Token = require("../models/token.model");

const generateAccessToken = (userId) => {
    const payload = {
        aud: userId,
        role: "user",
        expiresIn: "1h",
    }
    const secret = process.env.ACCESS_TOKEN_SECRET;
    const JWT = jwt.sign(payload,secret);
    return JWT;
}

const generateRefreshToken = (userId) => {
    const payload = {
        aud: userId,
        role: "user",
        expiresIn: "1d",
    }
    const secret = process.env.ACCESS_TOKEN_SECRET;
    const JWT = jwt.sign(payload,secret);
    return JWT;
}

const saveToken = async(userId,refreshToken) => {
    const token = await Token.create({
        user_id: userId,
        refresh_token: refreshToken
    });
    return token;
}



module.exports = {
    generateAccessToken,
    generateRefreshToken,
    saveToken,
}
