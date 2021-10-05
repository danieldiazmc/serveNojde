

const { UserChatSchema  } = require('../schemes');

class UserChat {


    name
    messages
    id

    constructor() { 
        this.messages=[];
        this.name;
        this.id;
    }

    get messages(){
        return messages;
    }

    async findUserChat(body){
        let {id} = body;
        const sUserChat = await UserChatSchema.findById(id);        
        if ( sUserChat ) {
            this.id = _id;
            this.messages = sUserChat.messages;
            this.name = sUserChat.name;
        }        
    }

    async addMessageFromUser(body){
        let {message,id} = body;
        let objMessages = { text:message , emisor:'user' };
        const test = UserChatSchema.findByIdAndUpdate(
            { _id: id }, 
            { $push: { messages: objMessages  } }
            ,function (error, success) {
                if (error) {
                    console.log(error);
                } else {
                    console.log(success);
                }
            }
        );
        this.messages.push(objMessages);       
    }

}

module.exports = {
    UserChat
}