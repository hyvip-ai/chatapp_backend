const mongoose = require('mongoose')

const Schema = mongoose.Schema;


const GroupSchema = Schema({
    members:Array,
    grpname:String,
    createdby:String,
    createdat:String
})

module.exports = mongoose.model('Group',GroupSchema)