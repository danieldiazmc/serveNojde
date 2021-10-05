const AssistantV2 = require('ibm-watson/assistant/v2');
const { IamAuthenticator } = require('ibm-watson/auth');

const assistantId = '6e8a1985-98bc-4b63-b264-4a9cc6ed9fb0'; // replace with assistant ID

const assistant = new AssistantV2({
  version: '2020-09-24',
  authenticator: new IamAuthenticator({
    apikey: 'fRT-mJsZaQk4cOHlxScbAO4wrx9BWwn70SmAOJXhz7sN',
  }),
  serviceUrl: 'https://api.us-south.assistant.watson.cloud.ibm.com',
});

const assistantInit = () =>{
    // Start conversation with empty message
    messageInput = {
    messageType: 'text',
    text: '',
    };
    return sendMessage(messageInput);    
}

// Send message to assistant.
const sendMessage = (messageInput) => {
    assistant
        .messageStateless({
        assistantId,
        input: messageInput,
        })
        .then(res => {         
        return processResponse(res.result);
        })
        .catch(err => {
        console.log(err); // something went wrong
        });
    }

    // Process the response.
const processResponse = (response) => {
    // Display the output from assistant, if any. Supports only a single
    // text response.
    if (response.output.generic) {
        if (response.output.generic.length > 0) {
            if (response.output.generic[0].response_type === 'text') {
                
                return response.output.generic[0].text;
                }
            }
        }
    }



module.exports={
    assistant,
    assistantInit
}
