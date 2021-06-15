const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRolValido = async(rol ='') => {
    const existeRol = await Role.findOne({ rol });
    if (!existeRol){
        throw new Error(`El rol ${rol} no está registrado en BD`);
    }
}

const existeEmail = async(correo) => {
    const existe = await Usuario.findOne({correo});
    if (existe){
        throw new Error(`El email ${correo} ya existe registrado en BD`);
    }
}

const existeUsuarioId = async(id) => {
    const existe = await Usuario.findById(id);
    if (!existe){
        throw new Error(`El id: ${id} no existe registrado en BD`);
    }
}


module.exports = {
    esRolValido,
    existeEmail,
    existeUsuarioId
}