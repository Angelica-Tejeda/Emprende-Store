const Usuario = require('./models/Usuario');
const Publicacion = require('./models/Publicacion');

Publicacion.belongsTo(Usuario, {
    foreignKey: 'usuario_id'
});
Usuario.hasMany(Publicacion, {
    foreignKey: 'usuario_id'
});

/*
Biblioteca.belongsTo(Obra, {
    foreignKey: 'obraId'
});
Obra.hasMany(Biblioteca, {
    foreignKey: 'obraId'
});
*/

/*
Usuario.belongsToMany(Obra, {through: "biblioteca"});
Obra.belongsToMany(Usuario, {through: "biblioteca"});*/