const mongoose = require('mongoose')

const Schema = mongoose.Schema;


const GroupMessegeSchema = Schema({
    sender:{type:Schema.ObjectId,ref:'User'},
    
    text:String,
    time:String,
    grpname:String
})

module.exports = mongoose.model('Groupmessege',GroupMessegeSchema)