const axios = require('axios');

const { UserChatSchema  } = require('../schemes');

class UserChat {

    constructor(app) { 
        this.messages=[];
        this.app=app;
    }

    async addMessageFromUser(body){

        let {watsonSDK,watsonAssistantID,watsonSessionID} = this.app.locals;
        let {message,id} = body;
        
        let messageUSER = { text:message , emisor:'user' };
        await UserChatSchema.findByIdAndUpdate( { _id: id }, { $push: { messages: messageUSER  } } );

        let bot = await watsonSDK.message({
            assistantId: watsonAssistantID,
            sessionId: watsonSessionID,
            input: {
            'message_type': 'text',
            'text': message
            }
            });
        let messageBOT = { text:bot.result.output.generic[0].text , emisor:'bot' };
        await UserChatSchema.findByIdAndUpdate( { _id: id }, { $push: { messages: messageBOT  } } );
        return messageBOT; 
              
    }

    async addMessageFromML(body){

       
        
        let {message,id} = body;

        let search=message.slice(13);
        let searchTrim = search.trim();

        

        let searchSplit = searchTrim.split(' ');
        
        let searchJoin = searchSplit.join('%');
        
        let query = await axios.get(`https://api.mercadolibre.com/sites/MLU/search?q=${searchJoin}&limit=3`);


        let {thumbnail,
            permalink,
            title,
            price,
            currency_id} = query.data.results;

        let messageUSER = { text:message , emisor:'user' };
        await UserChatSchema.findByIdAndUpdate( { _id: id }, { $push: { messages: messageUSER  } } );

        query.data.results.forEach(async element => {
            let {thumbnail,
                permalink,
                title,
                price,
                currency_id} = element; 
            let messageML = { products:[{thumbnail,
                permalink,
                title,
                price,
                currency_id}] , emisor:'ml', text:'' };
            await UserChatSchema.findByIdAndUpdate( { _id: id }, { $push: { messages: messageML  } } );           
        });
        


        return query.data.results;
    }

    async iniciarSession(){
        let {watsonSDK,watsonAssistantID,watsonSessionID} = this.app.locals;
        let {result:{session_id}} = await watsonSDK.createSession({
            assistantId: watsonAssistantID
          });
        this.app.locals.watsonSessionID=session_id;
        return true;
    }
    

}

module.exports = {
    UserChat
}