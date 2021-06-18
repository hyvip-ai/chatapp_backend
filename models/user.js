const mongoose = require('mongoose')

const Schema = mongoose.Schema;


const UserSchema  = Schema({
    name:String,
    username:String,
    password:String
})

module.exports = mongoose.model('User',UserSchema);