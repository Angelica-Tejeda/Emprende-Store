const {Sequelize} = require('sequelize');
const {database} = require('../config');

const sequelize = new Sequelize(
    database.database,
    database.username,
    database.password,
    {
      host: database.host,
      dialect: 'postgres',
      define: {
        // Previene que sequelize transforme los nombres de las tablas a plural
        freezeTableName: true,
      },
    },
);

module.exports = sequelize;
