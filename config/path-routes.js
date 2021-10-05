const express  = require('express');
const cors     = require('cors');
const rateLimit = require("express-rate-limit");

const pathRoutes={

    auth : '/api/auth',
    conditions:'/api/conditions',
    locations:'/api/localidades',
    logs:'/api/logs',
    swagger : '/documentation',
    trakings:'/api/tracking',
    users : '/api/users',
    chats : '/api/chats',

}

const appRoutes = (app) => {

        // Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
        // see https://expressjs.com/en/guide/behind-proxies.html
        // app.set('trust proxy', 1);
        const limiter = rateLimit({
            windowMs: 15 * 60 * 1000, // 15 minutes
            max: 100 // limit each IP to 100 requests per windowMs
        });
        
        //  apply to all requests
        // app.use(limiter);
    
        // Lectura y parseo del body
        // CORS
        app.disable('x-powered-by');
        app.use( cors() );
        app.use( express.json() );
        
        app.use( pathRoutes.auth, require('../routes/AuthRoutes'));
        app.use( pathRoutes.conditions, require('../routes/ConditionsRoutes'));
        app.use( pathRoutes.locations, require('../routes/LocationsRoutes'));
        app.use( pathRoutes.trakings, require('../routes/TrakingsRoutes'));
        app.use( pathRoutes.users, require('../routes/UsersRoutes'));
        app.use( pathRoutes.chats, require('../routes/ChatsRoutes'));
        
        // [LOGS]
        // app.use( pathRoutes.logs, require('../routes/LogsRoutes'));

        // [ NOT FOUND ]
        app.use((req, res, next) => {
            res.status(404).json({
                msg: 'X7501: Error en la consulta'
            });
        });
} 


module.exports={
    pathRoutes,
    appRoutes
}