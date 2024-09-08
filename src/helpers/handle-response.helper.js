const ResponseHelper = {
    error: (res, statusCode = 500, mess) => {
        return res.status(statusCode).send({
            statusCode: statusCode,
            payload: {},
            message: mess,
        })
    },
    success: (res, statusCode = 200, payload, mess) => {
        return res.status(statusCode).send({
            statusCode: statusCode,
            payload: payload,
            message: mess,
        })
    },
}

module.exports = ResponseHelper;
