const Answers = require("../models/answers.model");
const Questions = require("../models/questions.model");

const createAnswer = async (data) => {
  const question = await Questions.findByPk(data.question_id);
  if (!question) throw new Error("Not Exists Question");
  const oldAnswer = await Answers.findOne({
    where: {
      question_id: data.question_id,
      content: data.content,
      is_correct: data.is_correct
    }
  });
  if (oldAnswer) throw new Error("Already Exists Answer!!");
  const answer = await Answers.create({ ...data });
  return answer;
};

const updateAnswer = async (answerId, body) => {
  const answer = await Answers.findByPk(answerId);
  if (!answer) throw new Error("Not found Answer ");
  return await answer.update({ ...body }, { where: { id: answerId } });
};

const deleteAnswer = async (answerId) => {
  const answer = await Answers.findByPk(answerId);
  if (!answer) throw new Error("Not found answers");
  await answer.destroy({ where: { id: answerId } });
};

module.exports = {
  createAnswer,
  updateAnswer,
  deleteAnswer
};
