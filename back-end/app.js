const express = require('express');
const app = express();
const sequelize = require('./database/db');
const bodyParser = require('body-parser');
const cors = require('cors');
require('./database/associations');

// Configuracion
const PORT = process.env.PORT || 3000;

// Middleware
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Cross Origin
app.use(cors());

// Rutas
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/usuario', require('./routes/Usuario.routes'));

// Inicialización del servidor
app.listen(PORT, function() {
  console.log(`App en puerto http://localhost:${PORT}`);

  // Conexion a la base de datos
  sequelize
      .authenticate()
      .then(() => {
        console.log(
            'Conexión a la base de datos establecida correctamente',
        );
      })
      .catch((error) => {
        console.log('Se ha producido un error', error);
      });
});
