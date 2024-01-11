var mongoose = require('mongoose')
var ansschema = new mongoose.Schema({
    ans:{
        type:String
    }
})
module.exports = mongoose.model('ans', ansschema);