
const { UserChat } = require('../models/userChat');
const userChats = new UserChat();
class Sockets {

    constructor( io, assistant, app  ) {
        this.io = io;
        this.assistant = assistant;
        this.socketEvents();
        this.app = app;
        this.userChats = new UserChat(app);
    }
    
    socketEvents() {
        // On connection

        this.io.on('connect', ( socket ) => {
            console.log('a user CONNECT!');
            
            socket.on('new-message-user', body => { 

                if( body.message.substring(13,-1) == 'mercadolibre:'){
                    console.log('entra');
                    this.userChats.addMessageFromML(body).then( (resp) =>{
                        console.log(resp);
                        socket.emit('new-message-ml', resp); 
                    }); 
                }
                else{
                    this.userChats.addMessageFromUser(body).then( (resp) =>{
                        socket.emit('new-message-user', resp); 
                    }); 
                }
            });

            
            
            socket.on('cerrar-session', () => {
                let {watsonSDK,watsonAssistantID,watsonSessionID} = this.app.locals;
                watsonSDK.deleteSession({
                    assistantId: watsonAssistantID,
                    sessionId: watsonSessionID,
                  })
                console.log('a user disconnected!');
            });

            socket.on('iniciar-session', () => {

                this.userChats.iniciarSession().then( (resp) =>{
                    console.log('a user connected!');
                });

            });

            /*
            //TICKETS
            */
           
            socket.on( 'solicitar-ticket' , (data, callback) => {
                const nuevoTicket = this.ticketList.crearTicket();
                callback( nuevoTicket );
            });

            socket.on( 'siguiente-ticket-trabajar', ({ agente, escritorio }, callback) => {

                const suTicket = this.ticketList.asignarTicket( agente, escritorio ); 
                callback( suTicket );

                this.io.emit( 'ticket-asignado', this.ticketList.ultimos13 );
            })

            
            
        
        });
    }


}


module.exports = Sockets;