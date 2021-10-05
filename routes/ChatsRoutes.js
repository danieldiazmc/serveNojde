const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares');

const { postMessage } = require('../controllers');

const router = Router();

// [ CHATS ] [ MESSAGE ] 
router.post('/message',[
    check('text', 'El texto es obligatorio').not().isEmpty(),
    validateFields
], postMessage );


// router.get('/',[
//     validateJWT,
//     validLocationParamQuery,
//     validateFields
// ], getLocations );



module.exports = router;
