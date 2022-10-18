const Joi = require("joi");

const createQuestion = Joi.object()
  .keys({
    body: Joi.object().keys({
      content: Joi.string().min(1).required()
    })
  })
  .unknown(true);

const getListQuestion = Joi.object()
  .keys({
    query: Joi.object({
      size: Joi.number().integer(),
      page: Joi.number().integer()
    })
  })
  .unknown(true);

const getQuestion = Joi.object()
  .keys({
    params: Joi.object().keys({
      questionId: Joi.number().integer().required()
    })
  })
  .unknown(true);

const updateQuestion = Joi.object()
  .keys({
    params: Joi.object({
      questionId: Joi.number().min(1).required()
    }),
    body: Joi.object().keys({
      content: Joi.string().min(1).required()
    })
  })
  .unknown(true);

const deleteQuestion = Joi.object()
  .keys({
    params: Joi.object({
      questionId: Joi.number().integer().required()
    })
  })
  .unknown(true);

module.exports = {
  createQuestion,
  getListQuestion,
  getQuestion,
  updateQuestion,
  deleteQuestion
};
