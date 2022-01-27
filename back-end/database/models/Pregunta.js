const sequelize = require("../db");
const Sequelize = require("sequelize");
const Model = Sequelize.Model;

class Pregunta extends Model {}
Pregunta.init(
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
        titulo: {
            type: Sequelize.STRING(63),
            allowNull: true,
            validate: {
                len: [5, 60],
            },
        },
        texto: {
            type: Sequelize.TEXT,
            allowNull: true,
            validate: {
                len: [50, 4000],
            },
        },
        categoria: {
            type: Sequelize.ENUM({
                values: [
                    "Emprendimiento y ventas",
                    "Publicidad y marketing",
                    "Materiales, ingredientes y suministros",
                    "Familia y relaciones",
                    "Espectro autista y terapias",
                    "Salud y estilo de vida",
                    "Educación",
                    "Otros",
                ],
            }),
            allowNull: false,
        },
        activo: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: true,
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
        modelName: "pregunta",
        freezeTableName: true,
        timestamps: false,
    }
);

Pregunta.associate = (db) => {};
module.exports = Pregunta;
