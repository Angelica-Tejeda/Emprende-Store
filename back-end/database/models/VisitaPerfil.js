const sequelize = require("../db");
const Sequelize = require("sequelize");
const Model = Sequelize.Model;

class VisitaPerfil extends Model {}
VisitaPerfil.init(
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
        ip: {
            type: Sequelize.STRING(15),
            allowNull: true,
            validate: {
                isIP: true,
            },
        },
        fecha: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: sequelize.literal("now()"),
        },
    },
    {
        sequelize,
        modelName: "visita_perfil",
        freezeTableName: true,
        timestamps: false,
    }
);

VisitaPerfil.associate = (db) => {};
module.exports = VisitaPerfil;
