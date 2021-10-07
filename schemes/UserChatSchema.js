
const { Schema, model } = require('mongoose');

const _ProductsSchema = new Schema({
    thumbnail: {
        type:String,
        require:true
    },
    permalink: {
        type:String,
        require:true
    },
    title: {
        type:String,
        require:true
    },
    price: {
        type:String,
        require:true
    },
    currency_id: {
        type:String,
        require:true
    }
},{ _id : false });
            

const _MessageSchema = new Schema({
    text: {
        type:String,
        require:true
    },
    emisor: {
        type:String,
        require:true
    },
    products:[ 
        _ProductsSchema
    ],
},{ _id : false });


const UserChatSchema = Schema(
    {
        name: {
            type: String,
            required: [true, 'El nombre es obligatorio'],
            unique: true
        },
        ip: {
            type: String,
            required: true,            
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
