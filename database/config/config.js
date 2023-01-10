require("dotenv").config();
const env = process.env;

const development = {
    username: env.USERNAME,
    database: env.DATABASE,
    password: env.PASSWORD,
    host: env.HOST,
    dialect: "mysql",
    timezone: "+09:00",
    logging: false,
};
const test = {
    username: env.USERNAME,
    database: env.DATABASE,
    password: env.PASSWORD,
    host: env.HOST,
    dialect: "mysql",
    timezone: "+09:00",
    logging: false,
};

const production = {
    username: env.USERNAME,
    database: env.DATABASE,
    password: env.PASSWORD,
    host: env.HOST,
    dialect: "mysql",
    timezone: "+09:00",
};

module.exports = { development, production, test };
