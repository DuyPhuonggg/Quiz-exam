const jwt = require('jsonwebtoken');
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET, EXPIRE_TIME  } = process.env;

const createToken = (payload) => {
    const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: EXPIRE_TIME });
    const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET);

    return {
        accessToken,
        refreshToken
    }
}

module.exports = {
    createToken
}