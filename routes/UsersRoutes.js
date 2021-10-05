
const { Router } = require('express');
const bodyParser = require('body-parser')
const { check } = require('express-validator');

const { validateFields,
        validateUserChatParams,
        validateJWT,
        isAdminRol,
        haveRol } = require('../middlewares');

const { isValidRol, 
        isExistEmail, 
        isExistUserById } = require('../helpers/db-validators');

const { usersGet,
        usersPut,
        usersPost,
        usersDelete,
        usersPatch,
        usersRegisterChat } = require('../controllers/UsersController');

const router = Router();

router.get('/', usersGet );

router.put('/:id',bodyParser.json([
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( (id) => isExistUserById(id) ),
    check('rol').custom( isValidRol ),  // la funcion al solo recibir 1 parametro [rol] se puede pasar por argumento si escribirlo en la funcion a llamar [isValidRol(rol)], tomar como ejemplo la funcion de arriba
    validateFields
]),usersPut );

router.post('/',bodyParser.json([
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser más de 6 letras').isLength({ min: 6 }),
    check('email', 'El correo no es válido').isEmail(),
    check('email').custom( isExistEmail ),
    // check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom( isValidRol ), 
    validateFields
]), usersPost );

router.delete('/:id',bodyParser.json([
    validateJWT,
    isAdminRol,
    // haveRol('ADMIN_ROLE','VENTAS_ROLE'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( isExistUserById ),
    validateFields
]),usersDelete );

router.post('/chat-register',[
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('ip', 'La ip es obligatorio').not().isEmpty(),
    validateUserChatParams,
    validateFields
], usersRegisterChat);

router.patch('/', usersPatch );





module.exports = router;