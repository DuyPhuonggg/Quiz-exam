const JWT = require('jsonwebtoken');
require('dotenv').config();

const signAccessToken = (userId) => {
    return new Promise((resolve,reject) => {
        const payload = {
            expiresIn: "1h",
            audience: userId,
            issuer: "none"
        }
        const secret = process.env.ACCESS_TOKEN_SECRET;
        const options = {
        }
        JWT.sign(payload,secret,options, (err,token) => {
            if(err) {
                reject(err);
            }
            resolve(token)
        })
    })
}

const verifyAccessToken = () => {}

const signRefreshToken = (userId) => {
    return new Promise((resolve,reject) => {
        const payload = {
            expiresIn: "1d",
            audience: userId,
            issuer: "none"
        }
        const secret = process.env.REFRESH_TOKEN_SECRET;
        const options = {
        }
        JWT.sign(payload,secret,options, (err,token) => {
            if(err) {
                reject(err);
            }
            resolve(token)
        })
    })
}

module.exports = {
    signAccessToken,
    verifyAccessToken,
    signRefreshToken
}