const { Router } = require('express');

const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validator-campos');
const { login } = require('../controllers/auth');
const router = Router();

router.post('/', [
    check('usuario', 'El usuario es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validarCampos
], login);

module.exports = router;