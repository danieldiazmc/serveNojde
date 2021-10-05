const { response } = require('express')


const isAdminRol = ( req, res = response, next ) => {
    try {
        if ( !req.user ) { throw 'La ruta no existe'; }
    
        const { rol, name } = req.user;
        if ( rol !== 'ADMIN_ROLE' ) { throw 'La ruta no existe'; } // - No puede hacer esto
    
        next();
        
    } catch (error) {
        res.status(401).json({ error:{ error } });
    }    

    
}


const haveRol = ( ...rols  ) => {
    return (req, res = response, next) => {
        
        if ( !req.user ) {
            return res.status(500).json({
                msg: 'Se quiere verificar el role sin validar el token primero'
            });
        }

        if ( !rols.includes( req.user.rol ) ) {
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles ${ rols }`
            });
        }
        next();
    }
}



module.exports = {
    isAdminRol,
    haveRol
}