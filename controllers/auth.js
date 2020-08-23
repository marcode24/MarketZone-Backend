const { response } = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');

const { generarJWT } = require('../helpers/jwt');

const login = async(req, res = response) => {
    const { usuario, password } = req.body;
    try {
        const usuarioDB = await Usuario.findOne({ usuario });
        if (usuarioDB) {
            const validPassword = bcrypt.compareSync(password, usuarioDB.password);
            if (validPassword) {
                // generar token
                const token = await generarJWT(usuarioDB.id);
                return res.status(200).json({
                    ok: true,
                    token
                });
            } else {
                return res.status(400).json({
                    ok: false,
                    msg: 'Usuario y/o password incorrectos'
                });
            }
        } else {
            return res.status(400).json({
                ok: false,
                msg: 'Usuario y/o password incorrectos'
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
};

const renewToken = async(req, res = response) => {

    const uid = req.uid;

    const token = await generarJWT(uid);
    const usuario = await Usuario.findById(uid);
    res.json({
        ok: true,
        token,
        usuario,
    });
};


module.exports = {
    login,
    renewToken
};