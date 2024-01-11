var mongoose = require('mongoose');

var questionschema = new mongoose.Schema({
    question:{
        type:String,
    },
    sub_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subject'
    },
    ans:{
        type:String
    }
})
module.exports = mongoose.model('question',questionschema);