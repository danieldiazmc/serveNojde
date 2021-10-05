
const { CollectionSequenceScheme } = require('../schemes');

const autoincrement = async (increment) => {
    let seq_col = await CollectionSequenceScheme.findOneAndUpdate({name:increment} , {$inc:{seq:1} } , {new:true});
    return seq_col.seq;
}

module.exports = {
    autoincrement
}