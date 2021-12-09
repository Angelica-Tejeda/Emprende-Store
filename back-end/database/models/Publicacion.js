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
        usuario_id: {
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
            validate: {
                len: [5,60],
            }
        },
        descripcion: {
            type: Sequelize.TEXT,
            allowNull: true,
            validate: {
                len: [50,4000],
            }
        },
        servicio: {
            type: Sequelize.BOOLEAN,
            allowNull: true,
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
            validate: {
                min: 0,
            }
        },
        puntuacion: {
            type: Sequelize.DECIMAL(2, 1),
            allowNull: true,
        },
        descuento: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0,
            validate: {
                min: 0,
                max: 100,
            }
        },
        activo: {
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
        modelName: "publicacion",
        freezeTableName: true,
        timestamps: false,
    }
);

Publicacion.associate = (db) => {};
module.exports = Publicacion;
