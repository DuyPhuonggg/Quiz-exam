const userServices = require("./user.service");
const questionServices = require("./question.service");
const ResultsUser = require("../models/results_user.model");
const Answers = require("../models/answers.model");

const createResult = async (data) => {
  const { user_id, session, result } = data;
  const user = await userServices.findUserById(user_id);
  if (!user) throw new Error("Not Found User");
  const DoesExistSession = await ResultsUser.findAll({
    where: { session: session }
  });
  let count = DoesExistSession.dataValues;
  console.log(count);
  if (!count) throw new Error("Already Submit!");
  let countQuestion = 0;
  let countCorrectAnswer = 0;
  const submit = await Promise.all( result.map(async (v1) => {
      return new Promise(async (resolve, reject) => {
        countQuestion++;
        const questionId = await questionServices.getQuestionByContent(v1.question);
        const correctAnswer = await Answers.findAll({
          where: {
            question_id: questionId,
            is_correct: true
          }
        });
        const correctChoices = correctAnswer.map((v2) => v2.answer);
        let check = correctChoices.length == v1.answer.length && v1.answer.every((value, index) => value === correctChoices[index]);
        if (check) countCorrectAnswer++;
        const score = Math.round(100*countCorrectAnswer / countQuestion);
        const newData = await ResultsUser.create({
          session: session,
          user_id: user_id,
          question_id: questionId,
          user_choice: v1.answer
        });
        // console.log(score,'33333')
        return resolve(newData), score;
      });
    })
  );
  
  return  submit;
};

module.exports = {
  createResult
};
