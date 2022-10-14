const jwt = require('jsonwebtoken');
require('dotenv').config();
const Token = require("../models/token.model");
const TokenServices = require('../services/token.service');

const verifyAccessToken = async (req,res,next) => {
    try {
        const token = req.headers.authorization;
        const userId = req.params.id;
        const role = req.query.role;
        if(token) {
            const accessToken = token.split(' ')[1];
            jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (error, payload) => {
                if(error) throw new Error("Unauthorization!");
                req.payload = payload;
                console.log(payload.role,'2222');
                if( payload.aud != userId || payload.role != role ) throw new Error("Unauthorization!");
                next();
            });
        }
    } catch (error) {
        return res.status(406).json({ 
            statusCode: 406,
            message: 'Not Acceptable' 
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
        const payload =  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        console.log(payload,'2222222222');
        const accessToken =  TokenServices.generateAccessToken(payload.aud);
        const newRefreshToken =  TokenServices.generateRefreshToken(payload.aud);
        await TokenServices.saveToken(payload.aud,refreshToken);
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