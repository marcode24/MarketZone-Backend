const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validator-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const { getCategorias, getAllCategorias, crearCategoria, actualizarCateogoria, borrarCategoria } = require('../controllers/categorias');

const router = Router();


router.get('/', validarJWT, getCategorias);
router.get('/todo', validarJWT, getAllCategorias);

router.post('/', [validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoria);

router.put('/:id', [validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),

    validarCampos
], actualizarCateogoria);

router.delete('/:id', validarJWT, borrarCategoria);

module.exports = router;