const { Router } = require('express');

const { validarJWT } = require('../middlewares/validar-jwt');
const { getBusqueda, getDocumentosColeccion } = require('../controllers/busquedas');
const router = Router();

// obtener busqueda relacionado con el parametro
router.get('/:busqueda', validarJWT, getBusqueda);
router.get('/:tabla/:busqueda', validarJWT, getDocumentosColeccion);

module.exports = router;