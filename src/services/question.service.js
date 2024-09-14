const Questions = require("../models/questions.model");

//
// const getListQuestion = async (options) => {
//   const { page, size } = options;
//
//   const questions = await Questions.findAndCountAll({
//     attributes: ["id", "content"],
//     offset: offset,
//     limit: limit,
//     include: {
//       model: Answers,
//       attributes: ["id", "content"]
//     }
//   });
//   const data = pagination.getPaginationData(questions, page, size);
//   return data;
// };
//
// const getQuestionById = async (questionId) => {
//   const question = await Questions.findAndCountAll({
//     attributes: ["content"],
//     where: { id: questionId },
//     include: {
//       model: Answers,
//       attributes: ["id", "content"]
//     }
//   });
//   if (!question) throw new Error("Not found Question");
//   return question;
// };
//
// const getQuestionByContent = async (content) => {
//   const question = await Questions.findOne({
//     where: { content: content }
//   });
//   if (!question) throw new Error("Not Found Question");
//   return question.id;
// };
//
// const updateQuestionById = async (questionId, body) => {
//   const question = await Questions.findByPk(questionId);
//   if (!question) throw new Error("Not found");
//   return await question.update(
//     { content: body.content },
//     { where: { id: questionId } }
//   );
// };
//
// const deleteQuestionById = async (questionId) => {
//   const question = await Questions.findByPk(questionId);
//   if (!question) throw new Error("Not found");
//   await question.destroy({ where: { id: questionId } });
// };

const QuestionServices = {
    createOne: async (data) => {
      return await Questions.create(data);
    }
}

module.exports = QuestionServices;
