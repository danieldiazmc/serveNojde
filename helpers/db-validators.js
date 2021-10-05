const { RoleSchema,
    UserSchema} = require('../schemes');

const isValidRol = async(rol = '') => {

const existRol = await RoleSchema.findOne({ rol });
if ( !existRol ) {
    throw new Error(`El rol ${ rol } no está registrado en la BD`);
}
}

const isExistEmail = async( email = '' ) => {

// Verificar si el correo existe
const existEmail = await User.findOne({ email });
if ( existEmail ) {
    throw new Error(`El correo: ${ email }, ya está registrado`);
}
}

const isExistUserById = async( id ) => {

// Verificar si el correo existe
const existUser = await UserSchema.findById(id);
if ( !existUser ) {
    throw new Error(`El id no existe ${ id }`);
}
}



module.exports = {
isValidRol,
isExistEmail,
isExistUserById
}

