const { response, json } = require('express');
const Producto = require('../models/producto');


const getProductos = async(req, res = response) => {
    const desde = Number(req.query.body) || 0;
    try {
        const [productos, total] = await Promise.all([
            Producto.find().populate('proveedor', 'razon_social').populate('categoria', 'nombre').skip(desde).limit(5),
            Producto.countDocuments()
        ]);
        res.status(200).json({
            ok: true,
            productos,
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
const getProductoByID = async(req, res = response) => {
    const id = req.params.id;
    try {
        const producto = await Producto.findById(id);
        if (!producto) {
            return res.status(404).json({
                ok: false,
                msg: 'Producto no existe o no se encontro'
            });
        }
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

const crearProductos = async(req, res = response) => {
    const { codigo } = req.body;
    try {
        const productoExiste = await Producto.findOne({ codigo });
        if (productoExiste) {
            return res.status(400).json({
                ok: false,
                msg: 'El producto con ese codigo ya existe'
            });
        }
        const productoCrear = new Producto({...req.body });
        productoCrear.imgCloud = 'https://res.cloudinary.com/dfeujtobk/image/upload/c_scale,h_58/v1597454162/no-image_bkvoag.png';
        const productoDB = await productoCrear.save();
        res.json({
            ok: true,
            producto: productoDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
};

const actualizarProductos = async(req, res = response) => {
    const id = req.params.id;
    try {
        const producto = await Producto.findById(id);
        if (!producto) {
            return res.status(400).json({
                ok: false,
                msg: 'Producto no encotrado'
            });
        }
        const cambiosProducto = {...req.body };
        const productoActualizado = await Producto.findByIdAndUpdate(id, cambiosProducto, { new: true });
        res.json({
            ok: true,
            medico: productoActualizado
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
};

const borrarProductos = async(req, res = response) => {
    const id = req.params.id;
    try {

        const producto = await Producto.findById(id);
        if (!producto) {
            res.status(404).json({
                ok: false,
                msg: 'Producto no encontrado'
            });
        }
        await Producto.findByIdAndDelete(id);
        res.json({
            ok: true,
            msg: 'Producto eliminado'
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
    crearProductos,
    getProductos,
    actualizarProductos,
    borrarProductos,
    getProductoByID
};