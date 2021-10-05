const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields,
        validateJWT,
        isAdminRol,
        validateLocationParams,
        validLocationParamQuery } = require('../middlewares');

const { postLocation,
        getLocations } = require('../controllers');

const router = Router();

// [ LOCATION ] [ NEW ] 
router.post('/',[
    validateJWT,
    isAdminRol,
    check('pais', 'El pais es obligatorio').not().isEmpty(),
    check('departamento', 'El departamento es obligatorio').not().isEmpty(),
    check('barrio', 'El barrio es obligatorio').not().isEmpty(),
    check('codigoPostal', 'El codigoPostal es obligatorio').not().isEmpty(),
    validateLocationParams,
    validateFields
], postLocation );

// [ LOCATION ] [ ALL ] 
router.get('/',[
    validateJWT,
    validLocationParamQuery,
    validateFields
], getLocations );



module.exports = router;
