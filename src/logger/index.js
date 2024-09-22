const path = require("path");
const levels = {
    error: 'error',
    warn: 'warn',
    info: 'info',
    debug: 'debug',
    success: 'success',
}
const buildLog = (file, func, level, user, message) => {
    const createdAt = new Date();

    const dataLogger = {
        fileName: `${path.basename(file)}`,
        caller: `${func}`,
        lever: level,
        user: user,
        message: message,
        time: `${createdAt.toLocaleDateString()} ${createdAt.toLocaleTimeString()}`
    }
    return JSON.stringify(dataLogger)
}

const Logger = {
    info: function (file, user = "undefined", mess) {
        const funcName = this.info.caller.name;
        console.info(buildLog(file, funcName, levels.info, user, '[INFO] ' + JSON.stringify(mess)))
    },
    error: function (file, user = "undefined", mess) {
        const funcName = this.error.caller.name;
        console.error(buildLog(file, funcName, levels.error, user, '[ERROR] ' + JSON.stringify(mess)))
    },
    success: function (file, user = "undefined", mess) {
        const funcName = this.success.caller.name;
        console.log(buildLog(file, funcName, levels.success, user, '[SUCCESS] ' + JSON.stringify(mess)))
    }
}

module.exports = Logger;