const jwt = require('jsonwebtoken');
require('dotenv').config();
const Token = require("../models/token.model");
const TokenServices = require('../services/token.service');

const verifyAccessToken = async (req,res,next) => {
    try {
        const token = req.headers.token;
        if(token) {
            const accessToken = token.split(' ')[1];
            jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (error, payload) => {
                if(error) {
                    return next(console.log('Unauthorized'));
                }
                req.payload = payload;
                console.log(payload,'11111');
                next()
            });
            return accessToken;
        }
        console.log(accessToken,'1111111111111111');
        console.log(this.accessToken,'2222222222222222222');
        return res.status(200).json({
            statusCode: 200,
            message: "Verfiy token successfully",
            data: this.accessToken
        })
    } catch (error) {
        return res.status(500).json({ 
            statusCode: 500,
            message: error 
        });
    }
   
}

const verifyRefreshToken = async (req,res) => {
    try {
        const refreshToken = await Token.findOne({
            where: {
                refresh_token: req.body.refresh_token
            }
        });
        if(!refreshToken) {
            return res.status(400).json({
                statusCode:400,
                message: "Not found"
            });
        }
        const payload =  await jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        console.log(payload,'2222222222');
        const accessToken = await TokenServices.generateAccessToken(payload.aud);
        const newRefreshToken = await TokenServices.generateRefreshToken(payload.aud);
        await tokenServices.saveToken(payload.aud,refreshToken);
        return res.status(200).json({ 
            statusCode: 200,
            status: "Refresh-token successfully", 
            data: { 
                user : user, 
                access_token: accessToken, 
                refresh_token: newRefreshToken
            } 
        });
    } catch (error) {
        console.log('1111');
        return res.status(500).json({ 
            statusCode: 500,
            message: error 
        });
    } 
}
module.exports = {
    verifyAccessToken,
    verifyRefreshToken
}