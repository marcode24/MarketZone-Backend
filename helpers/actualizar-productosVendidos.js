const Producto = require('../models/producto');
const mongoose = require('mongoose');

const actualizarVentaGananciaProductos = async(req) => {
    let detalle = [];
    detalle = req.body.detalle;
    mongoose.set('useFindAndModify', false);
    detalle.forEach(async(item) => {
        const producto = await Producto.findById(item.producto._id);
        producto.vendidos += item.cantidad;
        producto.ganancia += item.cantidad * (item.producto.precio_venta - item.producto.precio_compra);
        await Producto.findByIdAndUpdate(item.producto._id, producto, { new: true });
    });
};

module.exports = {
    actualizarVentaGananciaProductos
};