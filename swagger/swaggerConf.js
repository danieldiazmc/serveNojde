const swaggerJsDoc = require('swagger-jsdoc');

const swaggerConf = () => {

    //Extended: https://swagger.io/specification/#infoObject
    const swaggerOptions = {

        swaggerDefinition:{
            components: {},
            info:{
                title:"Delivery APP",
                description:"Delivery APP descripcion",
                contact:{
                    name:"Departamento de desarrollo"
                },
                servers:["http://localhost:8080"]
            },
            securityDefinitions:{
                accessCode:{
                    type: 'oauth2',
                    tokenUrl: 'http://example.com/oauth/token',
                    authorizationUrl: 'http://example.com/oauth/auth',
                    flow: 'accessCode',
                    scopes:{
                    write: 'allows modifying resources',
                    read: 'allows reading resources'
                    }
                }
            },
            security:{ 
                accessCode:['read','write']
            }
        },
        apis:['./documentation/routes.yml']
    }
    return swaggerJsDoc(swaggerOptions);
}

const options = {
    swaggerOptions: {
        supportedSubmitMethods: [],
        defaultModelsExpandDepth: -1
    }
};

module.exports = {
    swaggerConf,
    options
}