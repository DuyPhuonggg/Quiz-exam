const userServices = require("./user.service");
const questionServices = require("./question.service");
const ResultsUser = require("../models/results_user.model");
const Answers = require("../models/answers.model");

const createResult = async (data) => {
  const { user_id, session, content } = data;
  const user = await userServices.findUserById(user_id);
  if (!user) throw new Error("Not Found User");
  const results = await ResultsUser.findAll({
    where: { session: session }
  });
  const sessions = results.map(v => v.session);
  if (sessions.includes(session) === true ) throw new Error("Already Submit, Update New Session");
  let countQuestion = 0;
  let countCorrectAnswer = 0;
  let score = 0;
  const submit = await Promise.all(content.map(async (v1) => {
      return new Promise(async (resolve, reject) => {
        countQuestion++;
        const questionId = await questionServices.getQuestionByContent(v1.question);
        const correctAnswer = await Answers.findAll({
          where: {
            question_id: questionId,
            is_correct: true
          }
        });
        const correctAnswerId = correctAnswer.map((v2) => v2.id).sort();
        let check = 
          correctAnswerId.length == v1.answer.length &&
          v1.answer.sort().every((value, index) => value === correctAnswerId[index]);
        if (check === true) countCorrectAnswer++;
        score = Math.round((100 * countCorrectAnswer) / countQuestion);
        const newData = await ResultsUser.create({
          session: session,
          user_id: user_id,
          question_id: questionId,
          user_choice: v1.answer
        });
        return resolve(newData);
      });
    })
  );
  return { submit, score };
};

module.exports = {
  createResult
};
