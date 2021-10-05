const { types } = require('./types');

const customResponse = (action,res) => {   

    switch (action.type) {
        case types.s200:  
            res.statusMessage = 'Success 200';
            res.json({
                ...action.request,
                errors:{}
            });
            break;
    
        case types.e401:
            res.statusMessage = 'Error 401';
            res.status(401).json({
                results:{},
                errors:action.request
            });        
            break;

        case types.eJWT:
            res.statusMessage = 'Su token expiro';
            res.status(402).json({
                results:{},
                errors:{
                    message:"Su token expiro"
                }
            });        
            break;

        case types.eJWT500:
            res.statusMessage = 'Error 500';
            res.status(500).json({
                results:{},
                errors:{
                    message:action.request
                }
            });        
            break;

        default:
            break;
    }
}


module.exports = {
    customResponse
}

