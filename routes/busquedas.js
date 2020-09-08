const { Router } = require('express');

const { validarJWT } = require('../middlewares/validar-jwt');
const { getBusqueda, getDocumentosColeccion, getProductoByCodigo } = require('../controllers/busquedas');
const router = Router();

// obtener busqueda relacionado con el parametro
router.get('/:busqueda', validarJWT, getBusqueda);
router.get('/producto/:busqueda', validarJWT, getProductoByCodigo);
router.get('/:tabla/:busqueda', validarJWT, getDocumentosColeccion);

module.exports = router;