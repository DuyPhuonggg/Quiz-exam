const userRouter = require("./user.route");
const authRouter = require("./auth.route");
const externalRouter = require("./external.route");
const questionRouter = require("./question.route");
const quizExamRouter = require("./quiz.route");

const initRouter = (app) => {
    app.use('/api/v1/auth', authRouter);
    app.use('/api/v1/users', userRouter);
    app.use('/api/v1/external', externalRouter);
    app.use('/api/v1/question', questionRouter);
    app.use('/api/v1/quiz-exam', quizExamRouter);
}

module.exports = initRouter;