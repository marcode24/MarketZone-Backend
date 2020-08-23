const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validator-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const { crearProductos, getProductoByID, getProductos, actualizarProductos, borrarProductos } = require('../controllers/productos');

const router = Router();

router.get('/', validarJWT, getProductos);
router.get('/:id', validarJWT, getProductoByID);

router.post('/', [
    validarJWT,
    check('codigo', 'El codigo del producto es necesario').not().isEmpty(),
    check('nombre', 'El nombre del producto es necesario').not().isEmpty(),
    check('precio_compra', 'El precio de compra del producto es necesario').not().isEmpty(),
    check('precio_venta', 'El precio de venta es necesario').not().isEmpty(),
    check('proveedor', 'El proveedor debe de ser valido (id)').isMongoId(),
    check('categoria', 'La categoria debe de ser valida (id)').isMongoId(),
    validarCampos
], crearProductos);

router.put('/:id', [
    validarJWT,
    check('codigo', 'El codigo del producto es necesario').not().isEmpty(),
    check('nombre', 'El nombre del producto es necesario').not().isEmpty(),
    check('precio_compra', 'El precio de compra del producto es necesario').not().isEmpty(),
    check('precio_venta', 'El precio de venta es necesario').not().isEmpty(),
    check('proveedor', 'El proveedor debe de ser valido (id)').isMongoId(),
    check('categoria', 'La categoria debe de ser valida (id)').isMongoId(),
    validarCampos
], actualizarProductos);

router.delete('/:id', validarJWT, borrarProductos);



// exportar el modulo
module.exports = router;