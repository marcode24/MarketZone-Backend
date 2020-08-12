const Proveedor = require('../models/proveedor');
const Usuario = require('../models/usuario');
const Producto = require('../models/producto');
const fs = require('fs');
const cloudinary = require('cloudinary').v2;

const borrarImagen = (path) => {
    if (fs.existsSync(path)) {
        fs.unlinkSync(path);
    }
};


const actualizarImagen = async(tipo, id, nombreArchivo, pathCloud) => {
    switch (tipo) {
        case 'proveedores':
            const proveedor = await Proveedor.findById(id);
            if (!proveedor) {
                return false;
            }
            const pathViejoProveedor = `./uploads/proveedores/${proveedor.img}`;
            borrarImagen(pathViejoProveedor);
            proveedor.img = nombreArchivo;
            proveedor.imgCloud = pathCloud;
            await proveedor.save();
            return true;

        case 'productos':
            const producto = await Producto.findById(id);
            if (!producto) {
                return false;
            }
            const pathViejoProducto = `./uploads/productos/${producto.img}`;
            borrarImagen(pathViejoProducto);
            producto.img = nombreArchivo;
            producto.imgCloud = pathCloud;
            await producto.save();
            return true;

        case 'usuarios':
            const usuario = await Usuario.findById(id);
            if (!usuario) {
                return false;
            }
            const pathViejoUsuario = `./uploads/usuarios/${usuario.img}`;
            borrarImagen(pathViejoUsuario);
            usuario.img = nombreArchivo;
            usuario.imgCloud = pathCloud;
            await usuario.save();
            return true;
    }

};

module.exports = {
    actualizarImagen
};