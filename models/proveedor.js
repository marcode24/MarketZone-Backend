const { Schema, model } = require('mongoose');

const proveedorSchema = Schema({
    razon_social: {
        type: String,
        required: true,
    },
    direccion: {
        type: String,
        required: true
    },
    telefono: {
        type: Number,
        required: true
    },
    img: {
        type: String
    },
    imgCloud: {
        type: String
    },
    nombre_contacto: {
        type: String,
        required: true
    },
    apellido_contacto: {
        type: String,
        required: true
    },
    telefono_contacto: {
        type: Number,
        required: true
    },
    correo_contacto: {
        type: String,
        required: true
    }
});

module.exports = model('Proveedor', proveedorSchema);