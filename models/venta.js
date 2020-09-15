const { Schema, model, SchemaTypes } = require('mongoose');


const DetalleSchema = Schema({
    cantidad: {
        type: Number,
        required: true
    },
    subtotal: {
        type: Number,
        required: true
    },
    producto: {
        type: SchemaTypes.ObjectId,
        ref: 'Producto',
        required: true
    }
});

const VentaSchema = Schema({
    noVenta: {
        type: Number,
        required: true,
    },
    fecha: {
        type: Date,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    noProductos: {
        type: Number,
        required: true
    },
    pagado: {
        type: Number,
        required: true
    },
    estado: {
        type: Boolean,
        default: true
    },
    ganancia: {
        type: Number,
        default: 0
    },
    detalle: [DetalleSchema],
    vendedor: {
        type: SchemaTypes.ObjectId,
        ref: 'Usuario',
        required: true
    }
});


module.exports = model('Venta', VentaSchema);