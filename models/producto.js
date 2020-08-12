const { Schema, model, SchemaTypes } = require('mongoose');

const ProductoSchema = Schema({

    codigo: {
        type: Number,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String
    },
    precio_compra: {
        type: Number,
        required: true
    },
    precio_venta: {
        type: Number,
        required: true
    },
    img: {
        type: String
    },
    imgCloud: {
        type: String
    },
    proveedor: {
        type: SchemaTypes.ObjectId,
        ref: 'Proveedor',
        required: true
    },
    categoria: {
        type: SchemaTypes.ObjectId,
        ref: 'Categoria',
        required: true
    }
});


module.exports = model('Producto', ProductoSchema);