const sequelize = require("../db");
const Sequelize = require("sequelize");
const Model = Sequelize.Model;

class VisitaCompra extends Model {}
VisitaCompra.init(
    {
        id: {
            type: Sequelize.INTEGER,
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
        publicacion_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: "publicacion",
                key: "id",
            },
        },
        ip: {
            type: Sequelize.STRING(15),
            allowNull: true,
        },
        fecha: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: sequelize.literal("now()"),
        },
    },
    {
        sequelize,
        modelName: "visita_compra",
        freezeTableName: true,
        timestamps: false,
    }
);

VisitaCompra.associate = (db) => {};
module.exports = VisitaCompra;
