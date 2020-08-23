const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');

const getUsuarios = async(req, res = resp) => {
    const desde = Number(req.query.body) || 0;
    const [usuarios, total] = await Promise.all([
        Usuario.find().skip(desde).limit(5),
        Usuario.countDocuments()
    ]);
    res.json({
        ok: true,
        usuarios,
        total
    });
};
const getUsuarioByID = async(req, res = response) => {
    const id = req.params.id;
    try {
        const usuario = await Usuario.findById(id);
        res.status(200).json({
            ok: true,
            usuario
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

};
const crearUsuario = async(req, res = response) => {
    const { usuario, password } = req.body;

    try {

        const usuarioExiste = await Usuario.findOne({ usuario });
        if (usuarioExiste) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario ya existe'
            });
        }
        const usuarioCrear = new Usuario(req.body);

        // encriptar password
        const salt = bcrypt.genSaltSync();
        usuarioCrear.password = bcrypt.hashSync(password, salt);
        usuarioCrear.imgCloud = 'https://res.cloudinary.com/dfeujtobk/image/upload/c_scale,h_50,q_100/v1598123661/user_xzklt6.png';
        // guardamos usuario
        await usuarioCrear.save();

        // generar jwt
        const token = await generarJWT(usuarioCrear.id);

        res.status(200).json({
            ok: true,
            usuarioCrear,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al crear usuario'
        });
    }


};

const actualizarUsuario = async(req, res = response) => {
    const uid = req.params.id;
    try {
        const usuarioDB = await Usuario.findById(uid);
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe ese usuario'
            });
        }

        const { password, usuario, ...campos } = req.body;

        if (usuarioDB.usuario !== usuario) {
            const existeUsuario = await Usuario.findOne({ usuario: usuario });
            if (existeUsuario) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese nombre de usuario'
                });
            }
        }
        campos.usuario = usuario;
        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, { new: true });
        res.status(200).json({
            ok: true,
            usuario: usuarioActualizado
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al actualizar usuario'
        });
    }
};

const eliminarUsuario = async(req, res = response) => {
    const uid = req.params.id;
    try {
        const usuarioDB = await Usuario.findById(uid);
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario con ese ID'
            });
        }
        await Usuario.findByIdAndDelete(uid);
        res.status(200).json({
            ok: true,
            msg: 'Usuario eliminado correctamente'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al eliminar usuario'
        });
    }
};

module.exports = {
    crearUsuario,
    getUsuarios,
    actualizarUsuario,
    eliminarUsuario,
    getUsuarioByID
};