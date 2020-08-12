const { response } = require('express');
const Categoria = require('../models/categoria');

const getCategorias = async(req, res = response) => {
    const desde = Number(req.query.body) || 0;
    try {
        const [categorias, total] = await Promise.all([
            Categoria.find().skip(desde).limit(5),
            Categoria.countDocuments()
        ]);
        res.status(200).json({
            ok: true,
            categorias,
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

const crearCategoria = async(req, res = response) => {
    const categoria = new Categoria({...req.body });
    try {
        const categoriaDB = await categoria.save();
        res.status(200).json({
            ok: true,
            categoria: categoriaDB
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
};

const actualizarCateogoria = async(req, res = response) => {
    const id = req.params.id;
    try {
        const categoria = await Categoria.findById(id);
        if (!categoria) {
            res.status(404).json({
                ok: false,
                msg: 'Categoria no encontrado'
            });
        }
        const cambioCategoria = {...req.body };
        const categoriaActualizado = await Categoria.findByIdAndUpdate(id, cambioCategoria, { new: true });
        res.status(200).json({
            ok: true,
            categoria: categoriaActualizado
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
};

const borrarCategoria = async(req, res = response) => {
    const id = req.params.id;
    try {
        const categoria = await Categoria.findById(id);
        if (!categoria) {
            res.status(404).json({
                ok: false,
                msg: 'Categoria no encontrado'
            });
        }
        await Categoria.findByIdAndDelete(id);
        res.json({
            ok: true,
            msg: 'Categoria eliminada'
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
    getCategorias,
    crearCategoria,
    actualizarCateogoria,
    borrarCategoria
};