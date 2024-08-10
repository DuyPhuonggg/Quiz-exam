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

function info(file, user = "undefined", mess){
    const funcName = info.caller.name;
    console.info(buildLog(file, funcName, levels.info, user, mess))
}

function error(file, user = "undefined", mess){
    const funcName = error.caller.name;
    console.error(buildLog(file, funcName, levels.error, user, mess))
}

function success(file, user = "undefined", mess){
    const funcName = success.caller.name;
    console.log(buildLog(file, funcName, levels.success, user, mess))
}

module.exports = {
    info,
    error,
    success
}