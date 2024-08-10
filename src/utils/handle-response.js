
const error = (res, statusCode = 500, payload, mess) => {
  return res.status(statusCode).send({
    payload: payload,
    message: mess,
  })
}

const success = (res, statusCode = 200, payload, mess) => {
  return res.status(statusCode).send({
    payload: payload,
    message: mess,
  })
}

module.exports = {
  error,
  success
}

