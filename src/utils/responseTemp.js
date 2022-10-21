const response = (httpStatus, mess, data = null) => {
  return { status: httpStatus, message: mess, data };
};

module.exports = response

