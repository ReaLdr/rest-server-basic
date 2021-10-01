const express = require('express')
const cors = require('cors');
const { dbConnection } = require('../db/config');

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        // Conectar a base de datos
        this.conectarDB();

        // Middlewares: funciones que añaden otra fuincionalidad al web server
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares(){

        // CORS
        this.app.use( cors() );

        // Lectura y Parseo del body
        this.app.use( express.json() );

        //Directorio público
        this.app.use( express.static('public') );


    }

    // Métodos
    routes(){

        this.app.use( this.usuariosPath, require('../routes/usuarios'));
    }

    listen(){
        this.app.listen(this.port, () =>{
            console.log('Server runing on port ', this.port);
        })
    }

}


module.exports = Server;