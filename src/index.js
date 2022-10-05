const express = require("express");
const db = require("./configs/database");
const {
  userRouter,
  authRouter,
  answersRouter,
  questionRouter,
  resultsUserRouter,
  scoresRouter
} = require("./routes/index");
const app = express();
const port = 3000;

//Test database is connected
db.authenticate()
  .then(() => console.log("Database connected..."))
  .catch((err) => console.log("Error " + err));

//routes
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/question", questionRouter);
app.use("/api/answers", answersRouter);
app.use("/api/results-user", resultsUserRouter);
app.use("/api/scores", scoresRouter);

app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`);
});
