const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validator-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { crearVenta, getVentas, getVentaByID } = require('../controllers/ventas');

const router = Router();

router.get('/', [validarJWT], getVentas);

router.post('/', [
    validarJWT,
    validarCampos
], crearVenta);

router.get('/:id', [validarJWT], getVentaByID);



// exportar el modulo
module.exports = router;