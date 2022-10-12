
const validate = (schema) => (req,res,next) => {
    const { value, error } = schema.validate(req);
    if (error) {
        return res.status(400).json({
            statusCode: 400,
            message: error.details[0].message
        })
      } 
    return next();
};

module.exports = validate;