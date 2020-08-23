const { Router } = require('express');

const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validator-campos');
const { login, renewToken } = require('../controllers/auth');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();

router.post('/', [
    check('usuario', 'El usuario es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validarCampos
], login);

router.get('/renew', [
    validarJWT
], renewToken);

module.exports = router;