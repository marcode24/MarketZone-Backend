const Venta = require('../models/venta');
const Producto = require('../models/producto');

const getTotalVentas = async() => {
    const [ventas, total] = await Promise.all([
        Venta.find(),
        Venta.countDocuments()
    ]);
    pagadas = await ventas.filter(item => item.estado === true).length;
    canceladas = await ventas.filter(item => item.estado === false).length;
    return { total, pagadas, canceladas };
};

// obtener 3 productos mas vendidos
const getProductosVendidos = async() => {
    const productos = await Producto.find();
    let vendidos = [];
    productos.forEach(producto => vendidos.push(producto.vendidos));
    // get top3
    let top3 = vendidos.sort((numero1, numero2) => numero2 - numero1).slice(0, 3);
    let productosTop3 = [];
    for (let i = 0; i < top3.length; i++) {
        productosTop3.push(await Producto.findOne({ vendidos: top3[i] })
            .populate('proveedor', 'razon_social').populate('categoria', 'nombre'));
    }
    return productosTop3;
};


module.exports = {
    getTotalVentas,
    getProductosVendidos,
};