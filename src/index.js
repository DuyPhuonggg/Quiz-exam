require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const logger = require('./logger');

const initRouter = require("./routes");
const db = require("./configs/database");
const redis = require("./configs/redis");
const app = express();

const PORT = process.env.PORT;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.json());

// Init routes
initRouter(app)

app.listen(PORT, async () => {
    logger.success(__filename, "root", `App is listening at port ${PORT}`);
    await redis.initRedis();
    db.authenticate()
        .then(() => logger.success(__filename, "root", 'Database is connected'))
        .catch((err) => logger.error(__filename, "root", err));
});
