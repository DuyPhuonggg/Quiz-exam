const express = require("express");
const bodyParser = require('body-parser');
const db = require("./configs/database");
const {
  userRouter,
  authRouter,
  answersRouter,
  questionsRouter,
  resultsUserRouter,
  scoresRouter
} = require("./routes/index");
const app = express();
const port = 3000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// parse json request body
app.use(express.json());

//Test database is connected
db.authenticate()
  .then(() => console.log("Database connected..."))
  .catch((err) => console.log("Error " + err));

//routes
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/questions", questionsRouter);
// app.use("/api/answers", answersRouter);
// app.use("/api/results-user", resultsUserRouter);
// app.use("/api/scores", scoresRouter);

app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`);
});
