const Questions = require("../models/questions.model");
const Categories = require("../models/categories.model");
const Users = require("../models/users.model");

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
    },
    createMany: async (data) => {
        return await Questions.bulkCreate(data);
    },
    findCategories: async (ignore = [], options = {}) => {
        return await Categories.findAll({
            attributes: { exclude: ignore },
            ...options
        });
    },
    findCategory: async (condition, ignore = []) => {
        return await Categories.findOne({
            attributes: {exclude: ignore},
            where: condition,
        })
    },
    findAllAndCount: async (condition, options = {}, ignore = []) => {
        const {count, rows} = await Questions.findAndCountAll({
            ...options,
            where: condition,
            attributes: {exclude: ignore}
        });

        return {
            count,
            data: rows?.length ? rows : [],
        }
    },
    find: async (condition, ignore = []) => {
        return await Questions.findOne({
            attributes: {exclude: ignore},
            where: condition,
        })
    }
}

module.exports = QuestionServices;
