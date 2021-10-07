const { types,
        customResponse } = require('../helpers');

const { UserChatSchema } = require('../schemes');

class chatsHandler {

    static async  registerChat (req, res = response) {

        try {
            
        
            let {watsonSDK,watsonAssistantID,watsonSessionID} = req.app.locals;
            const { name, ip } = req.body;
            await watsonSDK.message({
                assistantId: watsonAssistantID,
                sessionId: watsonSessionID,
                input: {
                'message_type': 'text',
                'text': ''
                }
                });
            let bot = await watsonSDK.message({
                assistantId: watsonAssistantID,
                sessionId: watsonSessionID,
                input: {
                'message_type': 'text',
                'text': name
                }
                });
            let messageBOT = [{ text:bot.result.output.generic[0].text , emisor:'bot' }];

            const userChat = new UserChatSchema({ name,ip,messages:messageBOT});
        
            let data = null;
        
            await Promise.all([userChat.save()])
            .then(results => {  
                data = {
                    results: results[0]
                };
            })
            .catch(err => {
                let payload = { type:types.e401, request:err } ;
                customResponse( payload, res );
            });          
            return data; 
        } catch (error) {
            let payload = { type:types.e401, request:error } ;
            customResponse( payload, res ); 
        }

    }

    static async  usersMessagesChat (req, res = response) {

        let {idUserChat:id} = req.query;
        let userMessages = await UserChatSchema.findById(id);
        return { results: userMessages.messages};

    }

    static async  usersDesconectChat (req, res = response) {

        let {watsonSDK,watsonAssistantID,watsonSessionID} = req.app.locals;
        watsonSDK.deleteSession({
            assistantId: watsonAssistantID,
            sessionId: watsonSessionID,
          })
        console.log('a user disconnected!');
        return true;

    }    

}

module.exports = chatsHandler;