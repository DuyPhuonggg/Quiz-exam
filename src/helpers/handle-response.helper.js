
const error = (res, statusCode = 500, mess) => {
  return res.status(statusCode).send({
    statusCode: statusCode,
    payload: {},
    message: mess,
  })
}

const success = (res, statusCode = 200, payload, mess) => {
  return res.status(statusCode).send({
    statusCode: statusCode,
    payload: payload,
    message: mess,
  })
}

module.exports = {
  error,
  success
}

