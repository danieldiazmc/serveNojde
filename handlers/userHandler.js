const { assistant } = require('../config/watson');

const { types,
        customResponse } = require('../helpers');

const { UserChatSchema } = require('../schemes');

class userHandler {

    static async  usersRegisterChat (req, res = response) {

        const { name, ip } = req.body;
        let messages = [ { text:'' , emisor:'' } ];

        await assistant.messageStateless({assistantId:'6e8a1985-98bc-4b63-b264-4a9cc6ed9fb0',input:{messageType: 'text',text: name}})
        .then((response) =>{ 
            let generic = response.result.output.generic;
            if (generic && generic.length > 0 && generic[0].response_type === 'text') {
                messages = [ { text:generic[0].text , emisor:'bot' } ];                
            } 
        })
        .catch(err => {
            let payload = { type:types.e401, request:err } ;
            customResponse( payload, res );
        });
        
        const userChat = new UserChatSchema({ name, ip,messages });
    
        let data = null;
    
        await Promise.all([userChat.save()])
        .then(results => {
            // results is an array of the results of each promise, in order.  
            data = {
                results: results[0]
            };
        })
        .catch(err => {
            let payload = { type:types.e401, request:err } ;
            customResponse( payload, res );
        });            
        return data; 

    }

}

module.exports = userHandler;