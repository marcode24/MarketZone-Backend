const { response } = require('express');
const Categoria = require('../models/categoria');
const mongoose = require('mongoose');

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

const getAllCategorias = async(req, res = response) => {
    try {
        const [categorias, total] = await Promise.all([
            Categoria.find(),
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

const actualizarCategoria = async(req, res = response) => {
    const id = req.params.id;
    try {
        const categoria = await Categoria.findById(id);
        if (!categoria) {
            return res.status(404).json({
                ok: false,
                msg: 'Categoria no encontrada'
            });
        }
        const cambiosCategoria = {...req.body };
        mongoose.set('useFindAndModify', false);
        const categoriaActualizada = await Categoria.findByIdAndUpdate(id, cambiosCategoria, { new: true });
        res.status(200).json({
            ok: true,
            categoria: categoriaActualizada
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
            return res.status(404).json({
                ok: false,
                msg: 'Categoria no encontrada'
            });
        }
        await Categoria.findByIdAndDelete(id);
        res.status(200).json({
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
    actualizarCategoria,
    borrarCategoria,
    getAllCategorias
};