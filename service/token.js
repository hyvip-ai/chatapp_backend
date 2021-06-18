require('dotenv').config();
const jwt = require('jwt-simple')
const secret = process.env.SECRET
// console.log(secret)
function createtoken(user){

    var payload = {
        sub : user._id,
        name:user.name,
        username:user.username
    }
    var token = jwt.encode(payload,secret)
    return token;
}

module.exports = {
    createtoken
}