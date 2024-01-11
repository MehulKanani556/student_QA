var mongoose = require('mongoose');
var studentschema = new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    }
})
module.exports =mongoose.model('student',studentschema)