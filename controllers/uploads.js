const { response } = require("express");
const { v4: uuidv4 } = require('uuid');
const cloudinary = require('cloudinary').v2;
const { actualizarImagen } = require("../helpers/actualizar-imagen");
const path = require('path');
const fs = require('fs');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

const fileUpload = (req, res = response) => {
    const tipo = req.params.tipo;
    const id = req.params.id;
    const tiposValidos = ['proveedores', 'productos', 'usuarios'];

    // validar si es un tipo valido
    if (!tiposValidos.includes(tipo)) {
        return res.status(400).json({
            ok: false,
            msg: 'no es tipo correcto'
        });
    }

    // validar que exista un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'no hay ninguna imagen'
        });
    }

    const file = req.files.imagen;

    const nombreCortado = file.name.split('.');
    const extensionArchivo = nombreCortado[nombreCortado.length - 1];

    // validar extension
    const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'];
    if (!extensionesValidas.includes(extensionArchivo)) {
        return res.status(400).json({
            ok: false,
            msg: 'no es una extension valida'
        });
    }

    // generar nombre de archivo
    const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;

    // path para guardar la imagen
    const path = `./uploads/${tipo}/${nombreArchivo}`;

    // mover la imagen
    file.mv(path, (err) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                ok: false,
                msg: 'error al subir imagen'
            });
        }
        // 
        cloudinary.uploader.upload(path, (result, err) => {
            const pathCloud = err.url;
            actualizarImagen(tipo, id, nombreArchivo, pathCloud);
            res.json({
                ok: true,
                msg: 'imagen subida',
                img: pathCloud
            });
        });
    });

};




module.exports = {
    fileUpload
};