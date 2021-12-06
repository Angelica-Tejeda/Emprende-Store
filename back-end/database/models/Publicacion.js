const sequelize = require("../db");
const Sequelize = require("sequelize");
const Model = Sequelize.Model;

class Publicacion extends Model {}
Publicacion.init(
    {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        emprendedor: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: "usuario",
                key: "id",
            },
        },
        titulo: {
            type: Sequelize.STRING(63),
            allowNull: true,
        },
        descripcion: {
            type: Sequelize.TEXT,
            allowNull: true,
        },
        servicio: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: "0",
        },
        fotos: {
            type: Sequelize.ARRAY(Sequelize.STRING(127)),
            allowNull: false,
            defaultValue: ["/default/product-default.png"],
        },
        categoria: {
            type: Sequelize.ARRAY(
                Sequelize.ENUM({
                    values: [
                        "comestibles",
                        "aperitivos",
                        "postres",
                        "vegano",
                        "vegetarieno",
                        "sin gluten",
                        "saludable",
                        "comida rápida",
                        "pan y harinas",
                        "pastas",
                        "ensaladas",
                        "bebidas",
                        "lacteos",
                        "artesanias",
                        "otros",
                        "frutas",
                        "vegetales",
                        "mascotas",
                    ],
                })
            ),
            allowNull: false,
            defaultValue: [],
        },
        precio: {
            type: Sequelize.DECIMAL(8, 2),
            allowNull: true,
        },
        puntuacion: {
            type: Sequelize.DECIMAL(2, 1),
            allowNull: true,
        },
        activo: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: "0",
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
        modelName: "publicacion",
        freezeTableName: true,
        timestamps: false,
    }
);

Publicacion.associate = (db) => {};
module.exports = Publicacion;
