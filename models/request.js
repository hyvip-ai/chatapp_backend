const mongoose = require('mongoose')

const Schema = mongoose.Schema

const RequestSchema = Schema({
    status:String,
    sender:{type:Schema.ObjectId,ref:'User'},
    receiver:{type:Schema.ObjectId,ref:'User'},
})

module.exports = mongoose.model('Request',RequestSchema)