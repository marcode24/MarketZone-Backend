const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validator-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { crearProveedor, getProveedores, actualizarProveedor, borrarProveedor } = require('../controllers/proveedores');

const router = Router();


router.get('/', validarJWT, getProveedores);

router.post('/', [validarJWT,
    check('razon_social', 'La razon social es obligatoria').not().isEmpty(),
    check('direccion', 'La direccion es obligatoria').not().isEmpty(),
    check('telefono', 'El telefono debe de ser un numero').isNumeric(),
    check('nombre_contacto', 'El nombre de contacto es obligatorio').not().isEmpty(),
    check('apellido_contacto', 'El apellido de contacto es obligatorio').not().isEmpty(),
    check('telefono_contacto', 'El telefono de contacto es obligatorio').isNumeric(),
    check('correo_contacto', 'El correo de contacto es obligatorio').not().isEmpty(),
    validarCampos
], crearProveedor);

router.put('/:id', [validarJWT,
    check('razon_social', 'La razon social es obligatoria').not().isEmpty(),
    check('direccion', 'La direccion es obligatoria').not().isEmpty(),
    check('telefono', 'El telefono debe de ser un numero').isNumeric(),
    check('nombre_contacto', 'El nombre de contacto es obligatorio').not().isEmpty(),
    check('apellido_contacto', 'El apellido de contacto es obligatorio').not().isEmpty(),
    check('telefono_contacto', 'El telefono de contacto es obligatorio').isNumeric(),
    check('correo_contacto', 'El correo de contacto es obligatorio').not().isEmpty(),
    validarCampos
], actualizarProveedor);

router.delete('/:id', validarJWT, borrarProveedor);

module.exports = router;