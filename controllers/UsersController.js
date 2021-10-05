const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const { UserSchema } = require('../schemes');

const { userHandler } = require('../handlers');

const { types,
    customResponse } = require('../helpers'); 

const usersGet = async(req = request, res = response) => {

    const { limit = 5, from = 0 } = req.query;
    const query = { state: true };

    const [ total, users ] = await Promise.all([
        UserSchema.countDocuments(query),
        UserSchema.find(query)
            .skip( Number( from ) )
            .limit(Number( limit ))
    ]);

    res.json({
        total,
        users
    });
}

const usersPost = async(req, res = response) => {
    
    const { name, email, password, rol } = req.body;
    const user = new UserSchema({ name, email, password, rol });

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync( password, salt );

    // Guardar en BD
    await user.save();

    res.json({
        user
    });
}

const usersPut = async(req, res = response) => {

    const { id } = req.params;
    const { _id, password, email, ...rest } = req.body;

    if ( password ) {
        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        rest.password = bcryptjs.hashSync( password, salt );
    }

    const user = await UserSchema.findByIdAndUpdate( id, rest );

    res.json(user);
}

const usersPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - usuariosPatch'
    });
}

const usersDelete = async(req, res = response) => {

    const { id } = req.params;
    const user = await UserSchema.findByIdAndUpdate( id, { state: false } );

    res.json(user);
}

// [ POST ] [ USERCHAT ]
const usersRegisterChat = async(req, res = response) => {
    let payload = { type:types.s200, request: await userHandler.usersRegisterChat(req,res) };
    customResponse( payload, res );
}


module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersPatch,
    usersDelete,
    usersRegisterChat
}