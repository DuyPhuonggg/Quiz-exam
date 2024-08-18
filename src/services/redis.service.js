const redis = require('../configs/redis');
const redisClient = redis.getRedis();

const setKey = async (key, value, options = {}) => {
    return await redisClient.set(key, value, options);
}

const getKey = async (key) => {
    return await redisClient.get(key);
}

const getTTL = async (key) => {
    return await redisClient.ttl(key);
}

module.exports = {
    setKey,
    getKey,
    getTTL
}