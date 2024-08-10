const express = require("express");
const bodyParser = require("body-parser");
const db = require("./configs/database");
const logger = require('./logger')

const initRouter = require("./routes");

const app = express();

require("dotenv").config();

const PORT = process.env.PORT;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.json());

//Test database is connected
db.authenticate()
    .then(() => logger.success(__filename, "admin", 'Database connected successfully.'))
    .catch((err) => logger.success(__filename, "admin", err));

//routes
initRouter(app)
// app.use("/api/users", userRouter);
// app.use("/api/questions", questionsRouter);
// app.use("/api/answers", answersRouter);
// app.use("/api/results", resultsUserRouter);

app.listen(PORT, () => {
    console.log(`App running at http://localhost:${PORT}`);
});
