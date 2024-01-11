var mongoose = require('mongoose');
var adminschema = new mongoose.Schema({
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
module.exports =mongoose.model('admin',adminschema)