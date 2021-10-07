const { Router } = require('express');
const bodyParser = require('body-parser');
const { check } = require('express-validator');

const { validateFields,
        validateUserChatParams } = require('../middlewares');

const { isExistUserChatById } = require('../helpers/db-validators');

const { usersMessagesChat,
        registerChat,
        usersDesconectChat } = require('../controllers/ChatsController');

const router = Router();

// [ CHATS ] [ USERCHAT ] 
router.post('/register',[
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('ip', 'La ip es obligatorio').not().isEmpty(),
    validateUserChatParams,
    validateFields
], registerChat);

// [ CHATS ] [ USERMESSAGES ] 
router.get('/:idUserChat',bodyParser.json([
    check('idUserChat', 'No es un ID válido').isMongoId(),
    check('idUserChat').custom( isExistUserChatById ),
    validateFields
]),usersMessagesChat );

router.get(('/desconect'),usersDesconectChat );

module.exports = router;
