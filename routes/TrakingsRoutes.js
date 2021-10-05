const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields,
        validateJWT,
        isAdminRol,
        validateNewTracking,
        isExistTracking } = require('../middlewares');

const { postTracking,
        getTracking } = require('../controllers');

const router = Router();

// [ TRACKIN ] [ NEW ] 
router.post('/register',[
    validateJWT,
    isAdminRol,

    check('tipoDestino', 'El tipo de destino es obligatorio y numerico').isNumeric().not().isEmpty(),
    check('tipoPago', 'El tipo de pago es obligatorio y numerico').isNumeric().not().isEmpty(),
    check('tipoPrioridad', 'El tipo de prioridad es obligatorio y numerico').isNumeric().not().isEmpty(),

    check('destinoNombre', 'El nombre del destinatario es obligatorio').not().isEmpty(),
    check('destinoTelefono', 'El telefono del destinatario es obligatorio y debe ser numerico, sin caracteres especiales').isLength({ min: 3, max:9 }).not().isEmpty(),

    check('remiteNombre', 'El nombre del remitente es obligatorio').not().isEmpty(),
    check('remiteTelefono', 'El telefono del remitente es obligatorio y debe ser numerico, sin caracteres especiales').isLength({ min: 3, max:9 }).not().isEmpty(),

    check('peso', 'El peso es obligatorio y numerico').isNumeric().not().isEmpty(),
    check('largo', 'El largo es obligatorio y numerico').isNumeric().not().isEmpty(),
    check('ancho', 'El ancho es obligatorio y numerico').isNumeric().not().isEmpty(),
    check('alto', 'El alto es obligatorio y numerico').isNumeric().not().isEmpty(),

    validateNewTracking,
    validateFields
], postTracking);

// [ TRACKIN ] [ GET ] 
router.get('/one',[
    validateJWT,
    isAdminRol,
    isExistTracking,
    validateFields
], getTracking );


module.exports = router;
