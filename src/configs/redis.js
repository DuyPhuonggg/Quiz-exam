const redis = require('redis');
const logger = require('../logger');
const {REDIS_HOST, REDIS_PORT} = process.env;

const clientRedis = redis.createClient({
    socket: {
        host: REDIS_HOST || 'redis',
        port: REDIS_PORT || 6379
    }
});

const statusConnectRedis = {
    CONNECT: 'connect',
    END: 'end',
    RECONNECT: 'reconnecting',
    ERROR: 'error'
}

const handleEventConnection = (connection) => {
    connection.on(statusConnectRedis.CONNECT, () => {
        logger.success(__filename, 'root', 'Redis is connected');
    })

    connection.on(statusConnectRedis.END, () => {
        logger.success(__filename, 'root', 'Redis is disconnected');
    })

    connection.on(statusConnectRedis.RECONNECT, () => {
        logger.success(__filename, 'root', 'Redis is reconnected');
    })

    connection.on(statusConnectRedis.ERROR, (err) => {
        console.log("err", err)
        logger.error(__filename, 'root', err);
    })
}

const initRedis = () => {
    handleEventConnection(clientRedis);
    clientRedis.connect().then()
}

const getRedis = () => clientRedis

module.exports = {
    initRedis,
    getRedis
}