const Usuario = require('../database/models/Usuario');
const bcrypt = require('bcrypt');

/*exports.createUsuario = async (req, res) => {
  const password = bcrypt.hashSync(req.body.password, 10);
  Usuario.create({
    email: req.body.email,
    password: password,
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    fecha_nacimiento: req.body.fecha_nacimiento,
    celular: req.body.celular,
    rol: req.body.rol,
  })
      .then((usuario) => {
        res.json(usuario);
      })
      .catch((err) => {
        console.log('error: ' + err);
        // res.json(err);
      });
};*/

exports.getAllUsuarios = async (req, res) => {
  Usuario.findAll({
    attributes: {exclude: ['password']},
  })
      .then((usuarios) => {
        res.json(usuarios);
      })
      .catch((err) => {
        console.log('error: ' + err);
        // res.json(err);
      });
};

exports.getUsuarioById = async (req, res) => {
  Usuario.findByPk(req.params.id, {attributes: {exclude: ['password']}})
      .then((usuario) => {
        res.json(usuario);
      })
      .catch((err) => {
        console.log('error: ' + err);
        // res.json(err);
      });
};

exports.getUsuarioByEmail = async (req, res) => {
  Usuario.findOne({
    where: {email: req.params.email},
    attributes: {exclude: ['password']},
  })
      .then((usuario) => {
        res.json(usuario);
      })
      .catch((err) => {
        console.log('error: ' + err);
        // res.json(err);
      });
};

exports.getUsuariosByRol = async (req, res) => {
  Usuario.findAll({
    where: {rol: req.params.rol},
    attributes: {exclude: ['password']},
  })
      .then((usuarios) => {
        res.json(usuarios);
      })
      .catch((err) => {
        console.log('error: ' + err);
        // res.json(err);
      });
};

exports.updateUsuario = async (req, res) => {
  Usuario.update(
      {
        email: req.body.email,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        fecha_nacimiento: req.body.fecha_nacimiento,
        negocio: req.body.negocio,
        //foto_perfil: req.body.foto_perfil,
        //foto_portada: req.body.foto_portada,
        bio: req.body.bio,
        celular: req.body.celular,
        facebook: req.body.facebook,
        instragram: req.body.instragram,
        twitter: req.body.twitter,
        tiktok: req.body.tiktok,
        linkedin: req.body.linkedin,
        balance: req.body.balance,
        puntuacion: req.body.puntuacion,
        rol: req.body.rol,
      },
      {
        where: {id: req.params.id},
      },
  )
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        console.log('error: ' + err);
        // res.json(err);
      });
};

exports.updateFotoPerfil = async (req, res) => {
  Usuario.update(
      {
        foto_perfil: req.file.path,
        //foto_portada: req.body.foto_portada,
      },
      {
        where: {id: req.params.id},
      },
  )
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        console.log('error: ' + err);
        // res.json(err);
      });
};

exports.updatePassword = async (req, res) => {
  const password = bcrypt.hashSync(req.body.password, 10);
  Usuario.update(
      {
        password: password,
      },
      {
        where: {id: req.params.id},
      },
  )
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        console.log('error: ' + err);
        // res.json(err);
      });
};

exports.deleteUsuario = async (req, res) => {
  Usuario.destroy({
    where: {id: req.params.id},
  })
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        console.log('error: ' + err);
        // res.json(err);
      });
};
