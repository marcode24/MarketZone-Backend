const Venta = require('../models/venta');

const getGananciaPorVenta = async(req) => {
    let detalle = [];
    detalle = req.body.detalle;
    let gananciaVenta = 0;
    detalle.forEach((item) => gananciaVenta += item.subtotal - (item.producto.precio_compra * item.cantidad));
    return gananciaVenta;
};

const getGananciaNeta = async() => {
    let ventas = await Venta.find();
    if (!ventas) {
        return 0;
    }
    ventas = ventas.filter(venta => venta.estado === true);
    let gananciaNeta = 0;
    ventas.forEach(venta => {
        gananciaNeta += venta.ganancia;
    });
    return gananciaNeta;
};


module.exports = {
    getGananciaPorVenta,
    getGananciaNeta,
};