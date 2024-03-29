const { response } = require('express');
const Proveedor = require('../models/proveedor');

const getProveedores = async(req, res = response) => {
    const desde = Number(req.query.desde) || 0;
    try {
        const [proveedores, total] = await Promise.all([
            Proveedor.find().skip(desde).limit(5),
            Proveedor.countDocuments()
        ]);
        res.status(200).json({
            ok: true,
            proveedores,
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

const getAllProveedores = async(req, res = response) => {
    try {
        const [proveedores, total] = await Promise.all([
            Proveedor.find(),
            Proveedor.countDocuments()
        ]);
        res.status(200).json({
            ok: true,
            proveedores,
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

const crearProveedor = async(req, res = response) => {
    const proveedor = new Proveedor({...req.body });
    try {
        proveedor.imgCloud = 'https://res.cloudinary.com/dfeujtobk/image/upload/c_scale,h_58/v1597454162/no-image_bkvoag.png';
        const proveedorDB = await proveedor.save();
        res.status(200).json({
            ok: true,
            proveedor: proveedorDB
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
};

const actualizarProveedor = async(req, res = response) => {
    const id = req.params.id;
    try {

        const proveedor = await Proveedor.findById(id);
        if (!proveedor) {
            res.status(404).json({
                ok: false,
                msg: 'Proveedor no encontrado'
            });
        }
        const cambioProveedor = {...req.body };

        const proveedorActualizado = await Proveedor.findByIdAndUpdate(id, cambioProveedor, { new: true });
        res.status(200).json({
            ok: true,
            proveedor: proveedorActualizado
        });

    } catch (error) {
        errores(error);
    }
};

const borrarProveedor = async(req, res = response) => {
    const id = req.params.id;
    try {
        const proveedor = await Proveedor.findById(id);
        if (!proveedor) {
            res.status(404).json({
                ok: false,
                msg: 'Proveedor no encontrado'
            });
        }
        await Proveedor.findByIdAndDelete(id);
        res.json({
            ok: true,
            msg: 'Proveedor eliminado'
        });
    } catch (error) {
        errores(error);
    }

};
const getProveedorbyID = async(req, res = response) => {
    const id = req.params.id;
    try {
        const proveedor = await Proveedor.findById(id);
        res.json({
            ok: true,
            proveedor
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
};

function errores(error) {
    console.log(error);
    res.status(500).json({
        ok: false,
        msg: 'Hable con el administrador'
    });
}

module.exports = {
    getProveedores,
    crearProveedor,
    actualizarProveedor,
    borrarProveedor,
    getProveedorbyID,
    getAllProveedores
};