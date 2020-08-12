const express = require('express');
require('dotenv').config();
const path = require('path');

const cors = require('cors');

const { dbConnection } = require('./database/config');

// se crea el servidor de express
const app = express();

// configuracion del cors
app.use(cors());

// lectura y parseo del body
app.use(express.json());

// conexion a la DB
dbConnection();

// directorio publico
app.use(express.static('public'));


// Rutas de mi server
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/proveedores', require('./routes/proveedores'));




app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT);
});