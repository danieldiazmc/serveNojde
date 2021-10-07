const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const { UserSchema,UserChatSchema } = require('../schemes');

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
const usersRegisterChat = async(req, res ) => {


    let {watson,watsonID} = req.app.locals;
    const { name, ip } = req.body;
    // let tres = await watson.message({
    //     assistantId: watsonID,
    //     sessionId: '{session_id}',
    //     input: {
    //       'message_type': 'text',
    //       'text': 'Hello'
    //       }
    //     })
    // console.log(tres);
    const {result:{output:{generic:messages}}} = await watson.messageStateless({assistantId:watsonID,input:{messageType: 'text',text: ''}});

    const userChat = new UserChatSchema( { name,ip,messages } );

    let data = null;

    await Promise.all([userChat.save()])
    .then(results => {
        data = { results: results[0] };
    })
    .catch(err => {
        let payload = { type:types.e401, request:err } ;
        customResponse( payload, res );
    });         
    
    res.status(201).json(data);

}


module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersPatch,
    usersDelete,
    usersRegisterChat
}