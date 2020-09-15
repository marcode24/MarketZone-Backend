const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validator-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getEstadisticas } = require('../controllers/estadisticas');

const router = Router();

router.get('/', validarJWT, getEstadisticas);

// exportar el modulo
module.exports = router;