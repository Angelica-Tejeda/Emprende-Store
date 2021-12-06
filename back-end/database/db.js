const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
    process.env.DBNAME,
    process.env.DBUSER,
    process.env.DBPASS,
    {
        host: process.env.DBHOST,
        dialect: "postgres",
        define: {
            // Previene que sequelize transforme los nombres de las tablas a plural
            freezeTableName: true,
        },
    }
);

module.exports = sequelize;
