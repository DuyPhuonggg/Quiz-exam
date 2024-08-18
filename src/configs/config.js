const loggingDev = (process.env.DB_LOGGING_DEV === true);

module.exports = {
    development: {
        username: process.env.DB_USERNAME || 'postgres',
        password: process.env.DB_PASSWORD || '123456',
        database: process.env.DB_NAME || 'quiz-exam',
        host: 'localhost',
        port: 5432,
        dialect: 'postgres',
        logging: false,
        seederStorage: "sequelize",
        seederStorageTableName: "SequelizeSeeder",
    },
    test: {
        username: process.env.CI_DB_USERNAME,
        password: process.env.CI_DB_PASSWORD,
        database: process.env.CI_DB_NAME,
        host: 'localhost',
        port: 5432,
        dialect: 'postgres',
        seederStorage: "sequelize",
        seederStorageTableName: "SequelizeSeeder",
    },
    production: {
        username: process.env.PROD_DB_USERNAME,
        password: process.env.PROD_DB_PASSWORD,
        database: process.env.PROD_DB_NAME,
        host: process.env.PROD_DB_HOSTNAME,
        port: process.env.PROD_DB_PORT,
        dialect: 'postgres',
        seederStorage: "sequelize",
        seederStorageTableName: "SequelizeSeeder",
    },
};