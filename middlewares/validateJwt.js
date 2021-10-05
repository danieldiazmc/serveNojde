const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const { types,
    customResponse } = require('../helpers');

const { UserSchema  } = require('../schemes');

const validateJWT = async( req = request, res = response, next ) => {

    try {

        const token = req.header('x-token');
        

        if ( !token ) {  
            let payload = { type:types.eJWT500, request:'No hay token en la petición' } ;
            customResponse( payload, res );
        }

        // leer el usuario que corresponde al uid
        // const { uid } = jwt.verify( token, process.env.SECRET_KEY_TOKEN );
        const { uid } = jwt.verify( token, process.env.SECRET_KEY_TOKEN);

        const user = await UserSchema.findById( uid );

        if( !user ) { 
            //- usuario no existe DB
            let payload = { type:types.eJWT500, request:'No hay token en la petición' } ;
            customResponse( payload, res );
        } 

        // Verificar si el uid tiene estado true
        if ( !user.state ) { 
            // - usuario con estado: false
            let payload = { type:types.eJWT500, request:'No hay token en la petición' } ;
            customResponse( payload, res );
        } 
        
        req.user = user;
        next();

    } catch (err) {
        let payload = { type:types.eJWT, request:err } ;
        customResponse( payload, res );
    }

}

module.exports = {
    validateJWT
}