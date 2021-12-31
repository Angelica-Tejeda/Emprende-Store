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
                len: [5, 60],
            },
        },
        descripcion: {
            type: Sequelize.TEXT,
            allowNull: true,
            validate: {
                len: [50, 4000],
            },
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
                        "p.Alimentos y comida",
                        "p.Postres",
                        "p.Vegano",
                        "p.Vegetariano",
                        "p.Sin gluten",
                        "p.Frutas y verduras",
                        "p.Bebidas",
                        "p.Lácteos",
                        "p.Medicina y salud",
                        "p.Medicina alternativa",
                        "p.Belleza y cuidado personal",
                        "p.Animales y mascotas",
                        "p.Ropa",
                        "p.Artesanías",
                        "p.Joyería y accesorios",
                        "p.Reciclaje",
                        "p.Juguetes",
                        "p.Electrónica",
                        "p.Videojuegos",
                        "p.Música",
                        "p.Deportes",
                        "p.Arte",
                        "p.Antigüedades y coleccionables",
                        "p.Libros y literatura",
                        "p.Vehículos",
                        "p.Propiedades e inmuebles",
                        "p.Muebles y hogar",
                        "p.Electrodomésticos",
                        "p.Materiales y herramientas",
                        "p.Jardinería y plantas",
                        "p.Variedades",
                        "p.Segunda mano",
                        "p.Para hombre",
                        "p.Para mujer",
                        "p.Para niños",
                        "p.Otros",
                        "s.Alquileres e inmuebles",
                        "s.Medicina y salud",
                        "s.Medicina alternativa",
                        "s.Belleza y cuidado personal",
                        "s.Niñeras y cuidadores",
                        "s.Fitness y actividad física",
                        "s.Animales y mascotas",
                        "s.Enseñanza y cursos",
                        "s.Fiestas y eventos",
                        "s.Música",
                        "s.Reparaciones e instalaciones",
                        "s.Servicio técnico PC y celulares",
                        "s.Transporte y fletes",
                        "s.Viajes y turismo",
                        "s.Gastronomía y alimentación",
                        "s.Repostería",
                        "s.Abogados y asesoría legal",
                        "s.Albañilería y construcción",
                        "s.Ebanistería y carpintería",
                        "s.Fontanería y plomería",
                        "s.Jardinería y plantas",
                        "s.Vehículos y automotrices",
                        "s.Moda y confección",
                        "s.Trabajos domésticos",
                        "s.Otros",
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
            },
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
            },
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
