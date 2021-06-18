const mongoose = require('mongoose')

const Schema = mongoose.Schema;


const MessegeSchema = Schema({
    sender:{type:Schema.ObjectId,ref:'User'},
    receiver:{type:Schema.ObjectId,ref:'User'},
    text:String,
    time:String
})

module.exports = mongoose.model('Messege',MessegeSchema)