const { response, request } = require('express');

const { chatsHandler } = require('../handlers');

const { types,
    customResponse } = require('../helpers'); 
// [ POST ] [ USERCHAT ]
const registerChat = async(req, res = response) => {
    let payload = { type:types.s200, request: await chatsHandler.registerChat(req,res) };
    customResponse( payload, res );
}

// [ GET ] [ USER ]
const usersMessagesChat = async(req, res = response) => {
    let payload = { type:types.s200, request: await chatsHandler.usersMessagesChat(req,res) };
    customResponse( payload, res );
}

const usersDesconectChat = async(req, res = response) => {
    let payload = { type:types.s200, request: await chatsHandler.usersDesconectChat(req,res) };
    customResponse( payload, res );
}
usersDesconectChat

module.exports = {
    registerChat,
    usersMessagesChat,
    usersDesconectChat
}