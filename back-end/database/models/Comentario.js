const sequelize = require("../db");
const Sequelize = require("sequelize");
const Model = Sequelize.Model;

class Comentario extends Model {}
Comentario.init(
    {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        publicacion_id: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: "publicacion",
                key: "id",
            },
        },
        usuario_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: "usuario",
                key: "id",
            },
        },
        celular: {
            type: Sequelize.STRING(15),
            allowNull: true,
            validate: {
                isNumeric: true,
                notEmpty: true,
                len: [11,12],
            },
        },
        nombre: {
            type: Sequelize.STRING(63),
            allowNull: false,
            defaultValue: "Usuario anónimo",
            validate: {
                notEmpty: true,
                len: [2,60],
            },
        },
        texto: {
            type: Sequelize.STRING(511),
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [3,500],
            }
        },
        puntuacion: {
            type: Sequelize.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true,
                min: 1,
                max: 5
            }
        },
        oculto: {
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
        modelName: "comentario",
        freezeTableName: true,
        timestamps: false,
    }
);

Comentario.associate = (db) => {};
module.exports = Comentario;
