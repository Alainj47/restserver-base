const { response, request } = require('express');

const usuariosGet = (req = request, res = response) => {
    
    const query = req.query;
    res.json({
        ok: true,
        msg: 'get Api - Controller',
        query
    })
};

const usuariosPost =  (req, res) => {

    const body = req.body;


    res.json({
        ok: true,
        msg: 'post Api',
        body: body
    })
}

const usuariosPut = (req, res) => {

    const id = req.params.id;

    res.json({
        ok: true,
        msg: 'put Api',
        id
    })
}

const usuariosDelete = (req, res) => {
    res.json({
        ok: true,
        msg: 'delete  Api'
    })
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}

