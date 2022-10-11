const express = require("express");
const bodyParser = require('body-parser');
const db = require("./configs/database");
const {
  userRouter,
  authRouter,
  answersRouter,
  questionsRouter,
  resultsUserRouter
} = require("./routes/index");
const app = express();
require('dotenv').config();
const PORT = process.env.PORT;

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
app.use("/api/answers", answersRouter);
app.use("/api/results-user", resultsUserRouter);

app.listen(PORT, () => {
  console.log(`App running at http://localhost:${PORT}`);
});
