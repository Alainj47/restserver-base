const express = require('express')
const cors = require('cors');
const { dbConnection } = require('../database/config');


class Server{
    constructor(){
        this.app    = express();
        this.port   = process.env.PORT;
        this.usuariosPath = '/api/usuarios';
        
        // Conectar a BD
        this.connectDB();

        //Middlewares
        this.middlewares();

        this.routes();        
    }

    routes(){

        this.app.use(this.usuariosPath, require('../routes/usuarios'));
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log(`Ejecutando en localhost:${this.port} `);
        });
    }

    async connectDB(){
        await dbConnection();
    }

    middlewares(){
        //CORS
        this.app.use( cors());

        //LEctura y parseo del Body
        this.app.use( express.json());

        //Directorio publico
        this.app.use(express.static('public'));
    }
}

module.exports = Server;