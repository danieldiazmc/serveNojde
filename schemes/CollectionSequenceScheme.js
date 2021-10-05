const { Schema, model } = require('mongoose');

const CollectionSequenceScheme = Schema({
        name: {
            type: String,
            require:true
        },
        seq:{
            type:Number,
            require:true
        }
    },
    {
        collection: 'collectionSequence'
    }
);


module.exports = model( 'collectionSequence', CollectionSequenceScheme );
