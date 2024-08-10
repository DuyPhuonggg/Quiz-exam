const userRouter = require("./user.route");
const authRouter = require("./auth.route");

const initRouter = (app) => {
    app.use('/api/v1/auth', authRouter);
    app.use('/api/v1/users', userRouter);

}

module.exports = initRouter;