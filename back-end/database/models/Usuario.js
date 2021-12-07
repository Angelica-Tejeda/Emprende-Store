const sequelize = require("../db");
const Sequelize = require("sequelize");
const Model = Sequelize.Model;

class Usuario extends Model {}
Usuario.init(
    {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        email: {
            type: Sequelize.STRING(127),
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true,
                isEmail: true,
                len: [8,125],
            },
        },
        password: {
            type: Sequelize.STRING(63),
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        nombre: {
            type: Sequelize.STRING(31),
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [2,30],
            },
        },
        apellido: {
            type: Sequelize.STRING(31),
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [2,30],
            },
        },
        fecha_nacimiento: {
            type: Sequelize.DATEONLY,
            allowNull: false,
            validate: {
                notEmpty: true,
                isDate: true
            },
        },
        negocio: {
            type: Sequelize.STRING(63),
            allowNull: true,
            validate: {
                notEmpty: true,
                len: [4,60],
            },
        },
        foto_perfil: {
            type: Sequelize.STRING(127),
            allowNull: false,
            defaultValue: "/default/profile-default.png",
        },
        foto_portada: {
            type: Sequelize.STRING(127),
            allowNull: false,
            defaultValue: "/default/banner-default.png",
        },
        bio: {
            type: Sequelize.TEXT,
            allowNull: true,
            validate: {
                notEmpty: true,
                len: [20,1500],
            },
        },
        celular: {
            type: Sequelize.STRING(15),
            allowNull: false,
            unique: true,
            validate: {
                isNumeric: true,
                notEmpty: true,
                len: [12,12],
            },
        },
        facebook: {
            type: Sequelize.STRING(127),
            allowNull: true,
            validate: {
                notEmpty: true,
                len: [5,125],
            },
        },
        instagram: {
            type: Sequelize.STRING(127),
            allowNull: true,
            validate: {
                notEmpty: true,
                len: [5,125],
            },
        },
        twitter: {
            type: Sequelize.STRING(127),
            allowNull: true,
            validate: {
                notEmpty: true,
                len: [5,125],
            },
        },
        tiktok: {
            type: Sequelize.STRING(127),
            allowNull: true,
            validate: {
                notEmpty: true,
                len: [5,125],
            },
        },
        linkedin: {
            type: Sequelize.STRING(127),
            allowNull: true,
            validate: {
                notEmpty: true,
                len: [5,125],
            },
        },
        balance: {
            type: Sequelize.DECIMAL(8, 2),
            allowNull: true,
        },
        puntuacion: {
            type: Sequelize.DECIMAL(2, 1),
            allowNull: true,
        },
        rol: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: "0",
        },
        activo: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: "1",
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
        modelName: "usuario",
        freezeTableName: true,
        timestamps: false,
    }
);

Usuario.associate = (db) => {};
module.exports = Usuario;
