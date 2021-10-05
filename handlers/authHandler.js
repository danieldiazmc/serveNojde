const bcryptjs = require('bcryptjs');

const { types,
        generarJWT,
        customResponse } = require('../helpers');

const { UserSchema  } = require('../schemes');

class locationHandler {

static async auth(req, res) {

    const { email, password } = req.body;

    try {
      
        // Verificar si el email existe
        const user = await UserSchema.findOne({ email });

        if ( !user ) {
            //correo incorrecto
            let payload = { type:types.eJWT500, request:'X7505: Usuario / Password no son correctos' } ;
            customResponse( payload, res );
        }

        // SI el usuario está activo
        if ( !user.state ) {
            //estado: false
            let payload = { type:types.eJWT500, request:'X7504: Usuario / Password no son correctos' } ;
            customResponse( payload, res );
        }

        // Verificar la contraseña
        const validPassword = bcryptjs.compareSync( password, user.password );

        if ( !validPassword ) {
            //password incorrecto
            let payload = { type:types.eJWT500, request:'X7503: Usuario / Password no son correctos' } ;
            customResponse( payload, res );
        }

        // Generar el JWT
        const token = await generarJWT( user.id );

        return res.json({
            user,
            token
        });

    } catch (error) {
        console.log(error);
        let payload = { type:types.eJWT500, request:'X7502: Hable con el administrador' } ;
        customResponse( payload, res );
    }   
}

}

module.exports = locationHandler;