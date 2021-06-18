const mongoose = require('mongoose')

const Schema = mongoose.Schema;


const ConnectionSchema = Schema({
  sender:{type:Schema.ObjectId,ref:'User'},
  receiver:{type:Schema.ObjectId,ref:'User'},
  status:String
})

module.exports = mongoose.model('Connection',ConnectionSchema)