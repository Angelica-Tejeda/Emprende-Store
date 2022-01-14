const sequelize = require("../db");
const Sequelize = require("sequelize");
const Model = Sequelize.Model;

class Movimiento extends Model {}
Movimiento.init(
    {
        id: {
            type: Sequelize.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        usuario_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: "usuario",
                key: "id",
            },
        },
        fecha: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        detalle: {
            type: Sequelize.STRING(127),
            allowNull: true,
            validate: {
                len: [3, 120],
            },
        },
        valor: {
            type: Sequelize.DECIMAL(8, 2),
            allowNull: false,
        },
        ingreso: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
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
        modelName: "movimiento",
        freezeTableName: true,
        timestamps: false,
    }
);

Movimiento.associate = (db) => {};
module.exports = Movimiento;
