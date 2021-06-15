const { response, request } = require('express');


const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');

const usuariosGet = async(req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = {estado: true };
    // FUNCIONAN PERO COMO AMBAS USAN AWAIT SE DEBE ESPERAR QUE LA PRIMERA TERMINE PARA EJECUTAR LA SEGUNGA Y TOMA MAS TIEMPO
    /* const usuarios = await Usuario.find(query)
    .skip(Number (desde))
    .limit(Number (limite));

    const total = await Usuario.countDocuments(query); 
    
    SE RESUELVE MEJOR CON UNA PROMESA DE LA SIGUIENTE FORMA:
    */

    const [total, usuarios] = await Promise.all([
        // EL PROMISE.all procesa ambas al mismo tiempo, si una falla fallan todas. 
        // VEntaja: No espera que una termine para procesar otra, por eso es mas optimo en este caso
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number (desde))
            .limit(Number (limite))
    ]);

    res.json({        
        total,
        usuarios
    })
};

const usuariosPost =  async (req, res) => {

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });
    
    // encriptar password
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt );

    //Guardar en BD
    await usuario.save();

    res.json({
        ok: true,
        msg: 'post Api',
        usuario
    })
}

const usuariosPut = async(req, res) => {

    const id = req.params.id;
    const { _id, password, google, ...resto } = req.body;

    //TODO: Validad id en BD
    

    if ( password ){
        // encriptar password
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt );
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto );

    res.json(usuario)
}

const usuariosDelete = async (req, res) => {

    const { id } = req.params;

    //borrado fisico
    //const usuario = await Usuario.findByIdAndDelete( id )
    const usuario = await Usuario.findByIdAndUpdate( id, {estado: false });

    res.json(usuario)
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}


