var mongoose = require('mongoose');

var subjectschema = new mongoose.Schema({
    sub_name:{
        type:String
    }
})
module.exports = mongoose.model('subject', subjectschema);