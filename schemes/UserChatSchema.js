
const { Schema, model } = require('mongoose');

const _MessageSchema = new Schema({
    text: {
        type:String,
        require:true
    },
    emisor: {
        type:String,
        require:true
    }
},{ _id : false });


const UserChatSchema = Schema(
    {
        name: {
            type: String,
            required: [true, 'El nombre es obligatorio']
        },
        ip: {
            type: String,
            unique: true
        },
        messages: [
            _MessageSchema
        ],
        rol: {
            type: String,
            required: true,
            default: 'GUEST'
        },
        state: {
            type: Boolean,
            default: true
        }
    },
    {
        collection: 'userChat',
        timestamps: { createdAt: true, updatedAt: false }
    }
);



UserChatSchema.methods.toJSON = function() {
    const { __v, password, _id, ...user  } = this.toObject();
    user.idUser = _id;
    return user;
}

module.exports = model( 'userChat', UserChatSchema );
