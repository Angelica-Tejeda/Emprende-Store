const sequelize = require("../db");
const Sequelize = require("sequelize");
const Model = Sequelize.Model;

class Respuesta extends Model {}
Respuesta.init(
    {
        id: {
            type: Sequelize.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        usuario_id: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: "usuario",
                key: "id",
            },
        },
        pregunta_id: {
            type: Sequelize.BIGINT,
            allowNull: false,
            references: {
                model: "pregunta",
                key: "id",
            },
        },
        texto: {
            type: Sequelize.TEXT,
            allowNull: true,
            validate: {
                len: [20, 4000],
            },
        },
        mejor_respuesta: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        creado: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: sequelize.literal("now()"),
        },
        modificado: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: sequelize.literal("now()"),
        },
    },
    {
        sequelize,
        modelName: "respuesta",
        freezeTableName: true,
        timestamps: false,
    }
);

Respuesta.associate = (db) => {};
module.exports = Respuesta;
