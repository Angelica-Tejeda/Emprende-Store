const Usuario = require('../database/models/Usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.registrarUsuario = async (req, res) => {
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
        res.json({
          usuario: usuario,
        });
      })
      .catch((err) => {
        console.log('error: ' + err);
        // res.json(err);
      });
};

exports.iniciarSesion = async (req, res) => {
  Usuario.findOne({
    where: {email: req.body.email},
    attributes: ['id', 'password', 'rol'],
    // attributes: { exclude: ["password"] },
  })
      .then((usuario) => {
        if (!usuario) {
          res.status(404).json({
            msg: 'El correo electrónico proporcionado no ha sido registrado.',
          });
        } else {
          if (
            bcrypt.compareSync(req.body.password, usuario.password)
          ) {
            const token = jwt.sign({usuario: usuario}, 'emprendestore', {
              expiresIn: '7d',
            });
            res.json({
              usuario: {
                id: usuario.id,
                rol: usuario.rol,
              },
              token: token,
            });
          } else {
            res.status(401).json({
              msg: 'La contraseña proporcionada no es correcta',
            });
          }
        }
      })
      .catch((err) => {
        console.log('error: ' + err);
        // res.json(err);
      });
};
