// Servidor de Express
const express  = require('express');
const http     = require('http');
const socketio = require('socket.io');
const path     = require('path');

const Sockets  = require('../routes/SocketsRoutes');
const { dbConnection } = require('../database/config');

const { pathRoutes,appRoutes } = require('./path-routes');
const swaggerUi = require("swagger-ui-express");
const { swaggerConf,options } = require('../swagger/swaggerConf');

const { assistant } = require('./watson');

class Server {

    constructor() {

        this.app  = express();
        this.port = process.env.PORT;

        // Conectar a base de datos
        this.conectarDB();

        // Http server
        this.server = http.createServer( this.app );
        
        // Configuraciones de sockets
        this.io = socketio( this.server, { /* configuraciones */ } );

        // Rutas de mi aplicación
        appRoutes(this.app);

        // Inicializar sockets
        this.sockets = new Sockets( this.io, assistant, this.app );     
        
        this.externals();

    }

    async conectarDB() {
        await dbConnection();
    }

    async externals(){
        let {watson,assistantId,session_id} = await assistant();
        this.app.locals={
            watsonSDK:watson,
            watsonAssistantID:assistantId,
            watsonSessionID:session_id
        }
    }

    middlewares() {
        // Desplegar el directorio público
        //this.app.use( express.static( path.resolve( __dirname, '../public' ) ) );

        //Opciones iniciales de swagger
        // Extended: https://swagger.io/specification/#infoObject
        const { swagger } = pathRoutes;
        this.app.use(swagger, swaggerUi.serve, swaggerUi.setup( swaggerConf(),options )); 
        
        
    }

    execute() {

        // Inicializar Middlewares
        this.middlewares();

        // Inicializar Server
        this.server.listen( this.port, () => {
            console.log('Server corriendo en puerto:', this.port );
        });
    }

}


module.exports = Server;