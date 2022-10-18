const Joi = require("joi");

const createAnswer = Joi.object()
  .keys({
    body: Joi.object().keys({
      question_id: Joi.number().integer().required(),
      content: Joi.string().min(1).required(),
      is_correct: Joi.string().required()
    })
  })
  .unknown(true);

const updateAnswer = Joi.object()
  .keys({
    params: Joi.object({
      answerId: Joi.number().min(1).required()
    }),
    body: Joi.object().keys({
      question_id: Joi.number().integer().required(),
      content: Joi.string().min(1).required(),
      is_correct: Joi.string().required()
    })
  })
  .unknown(true);

const deleteAnswer = Joi.object()
  .keys({
    params: Joi.object({
      answerId: Joi.number().integer().required()
    })
  })
  .unknown(true);

module.exports = {
  createAnswer,
  updateAnswer,
  deleteAnswer
};
