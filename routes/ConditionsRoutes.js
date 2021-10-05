

const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields,
        validateJWT,
        isAdminRol,
        validateConditions,
         } = require('../middlewares');

const { postConditions,
        getConditions } = require('../controllers');

const router = Router();


// [ CONDITIONS ] [ NEW ] 
router.post('/conditions',[
    validateJWT,
    isAdminRol,
    
    check('destino', 'El destino es obligatorio').not().isEmpty(),
    check('prioridad', 'La prioridad es obligatorio').not().isEmpty(),
    check('pago', 'El metodo de pago es obligatorio').not().isEmpty(),

    check('destino', 'El destino debe ser numerico').isNumeric(),
    check('prioridad', 'La prioridad debe ser numerico').isNumeric(),
    check('pago', 'El metodo de pago debe ser numerico').isNumeric(),

    validateConditions,
    validateFields
], postConditions );

// [ CONDITIONS ] [ ALL ] 
router.get('/conditions',[
    validateJWT,
    isAdminRol,
    validateFields
], getConditions );

module.exports = router;