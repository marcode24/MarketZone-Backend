const { response } = require('express');

const Venta = require('../models/venta');

const { actualizarVentaGananciaProductos } = require('../helpers/actualizar-productosVendidos');
const { getGananciaPorVenta } = require('../helpers/ganancia');
const { getNoVenta } = require('../helpers/no-venta');

const getVentas = async(req, res = response) => {
    const desde = Number(req.query.body) || 0;
    try {
        // .populate({ path: 'detalle', populate: { path: 'producto', populate: { path: 'proveedor' } } })
        // varios populate anidados para obtener datos de dicho objectID
        const [ventas, total] = await Promise.all([
            Venta.find().populate('vendedor', 'nombre apellido')
            .populate({ path: 'detalle', populate: { path: 'producto' } })
            .skip(desde).limit(50),
            Venta.countDocuments()
        ]);
        res.status(200).json({
            ok: true,
            ventas,
            total
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
};

const getVentaByID = async(req, res = response) => {
    const id = req.params.id;
    try {
        const venta = await Venta.findById(id)
            .populate({ path: 'detalle', populate: { path: 'producto' } })
            .populate('vendedor', 'nombre apellido');
        if (!venta) {
            return res.status(404).json({
                ok: false,
                msg: 'Venta no encontrada'
            });
        }
        res.status(200).json({
            ok: true,
            venta
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
};

const crearVenta = async(req, res = response) => {
    try {
        const ventaCrear = new Venta({...req.body });
        ventaCrear.ganacia = 0;
        if (ventaCrear.estado) {
            actualizarVentaGananciaProductos(req);
            ventaCrear.ganancia = await getGananciaPorVenta(req);
        }
        ventaCrear.noVenta = await getNoVenta();
        const ventaDB = await ventaCrear.save();
        res.json({
            ok: true,
            venta: ventaDB
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
};


module.exports = {
    crearVenta,
    getVentas,
    getVentaByID
};