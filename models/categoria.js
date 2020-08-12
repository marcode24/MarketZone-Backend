const { Schema, model } = require('mongoose');

const categoriaSchema = Schema({
    nombre: {
        type: String,
        required: true,
    },
    estado: {
        type: Boolean,
        required: true,
        default: false
    },
});

module.exports = model('Categoria', categoriaSchema);