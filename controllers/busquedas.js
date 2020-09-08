const { response } = require('express');

const Producto = require('../models/producto');
const Categoria = require('../models/categoria');
const Proveedor = require('../models/proveedor');

const getBusqueda = async(req, res = response) => {
    try {
        const busqueda = req.params.busqueda;
        // regex es para tener una busqueda sin importar caracteres (blanda)
        const regex = new RegExp(busqueda, 'i');
        const [productos] = await Promise.all([
            Producto.find({ nombre: busqueda }),
        ]);
        res.json({
            ok: true,
            productos
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
};

const getProductoByCodigo = async(req, res = response) => {
    const codigo = req.params.busqueda;
    try {
        const producto = await Producto.findOne({ codigo });
        res.status(200).json({
            ok: true,
            producto
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

};

const getDocumentosColeccion = async(req, res = response) => {
    try {
        const tabla = req.params.tabla;
        const busqueda = req.params.busqueda;
        // regex es para tener una busqueda sin importar caracteres (blanda) case-Sensitive
        const regex = new RegExp(busqueda, 'i');
        let data;
        switch (tabla) {
            case 'productos':
                data = await Producto.find({ nombre: regex })
                    .populate('proveedor', 'razon_social')
                    .populate('categoria', 'nombre');
                break;
            case 'categorias':
                data = await Categoria.find({ nombre: regex });
                break;
            case 'proveedores':
                data = await Proveedor.find({ razon_social: regex });
                break;
            default:
                return res.status(500).json({
                    ok: false,
                    msg: 'La tabla no existe'
                });
        }
        res.status(200).json({
            ok: true,
            resultado: data
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
};

module.exports = {
    getBusqueda,
    getDocumentosColeccion,
    getProductoByCodigo
};