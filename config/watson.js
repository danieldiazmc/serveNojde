const AssistantV2 = require('ibm-watson/assistant/v2');
const { IamAuthenticator } = require('ibm-watson/auth');

const assistant = async() => {
    const assistantId = '6e8a1985-98bc-4b63-b264-4a9cc6ed9fb0'; 
    try {
        let watson = await new AssistantV2({
            version: '2020-09-24',
            authenticator: new IamAuthenticator({
                apikey: 'fRT-mJsZaQk4cOHlxScbAO4wrx9BWwn70SmAOJXhz7sN',
            }),
            serviceUrl: 'https://api.us-south.assistant.watson.cloud.ibm.com',
            });
        console.log('Watson Online');

        let {result:{session_id}} = await watson.createSession({
            assistantId: assistantId
          });


        return {watson,assistantId,session_id};
        
        
    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar Watson');
    }
    
    
}

module.exports={
    assistant
}
