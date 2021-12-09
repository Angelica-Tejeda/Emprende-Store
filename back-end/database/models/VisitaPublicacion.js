const sequelize = require("../db");
const Sequelize = require("sequelize");
const Model = Sequelize.Model;

class VisitaPublicacion extends Model {}
VisitaPublicacion.init(
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
        contacto: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        fecha: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: sequelize.literal("now()"),
        },
    },
    {
        sequelize,
        modelName: "visita_publicacion",
        freezeTableName: true,
        timestamps: false,
    }
);

VisitaPublicacion.associate = (db) => {};
module.exports = VisitaPublicacion;
