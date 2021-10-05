const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validateFields');

const { login } = require('../controllers/AuthController');

const router = Router();

router.post('/login',[
    check('email', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validateFields
],login );

module.exports = router;