const { Router } = require('express');
const expressFileUpload = require('express-fileupload');
const { fileUpload, mostrarImagen } = require('../controllers/uploads');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.use(expressFileUpload());

// obtener busqueda relacionado con el parametro
router.put('/:tipo/:id', validarJWT, fileUpload);

module.exports = router;