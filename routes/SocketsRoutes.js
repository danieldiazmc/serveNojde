
const { UserChat } = require('../models/userChat');
const userChats = new UserChat();
class Sockets {

    constructor( io, assistant  ) {
        this.io = io;
        this.assistant = assistant;
        this.socketEvents();
    }
    
    socketEvents() {
        // On connection

        this.io.on('connect', ( socket ) => {

            socket.on('find-userchat', body => {  
                userChats.findUserChat(body).then( resp => {
                    if(userChats.messages.length > 0){
                        socket.emit('find-userchat', {messages:userChats.messages})
                    }
                });                              
            });


            socket.on('new-message-user', (message) => {  
                userChats.addMessageFromUser(message).then( res => {
                    socket.emit('new-message-user', {text:message , emisor:'user'});
                });
            });

            socket.on('disconnect', () => {
                console.log('a user disconnected!');
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