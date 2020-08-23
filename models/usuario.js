const { Schema, model } = require('mongoose');


const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    direccion: {
        type: String,
        required: true
    },
    telefono: {
        type: Number,
        required: true
    },
    usuario: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    imgCloud: {
        type: String
    },
    role: {
        type: String,
        required: true,
        default: 'USER_ROLE'
    }
});

module.exports = model('Usuario', UsuarioSchema);