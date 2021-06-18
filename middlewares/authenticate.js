require('dotenv').config();
const jwt = require('jwt-simple')
const secret = process.env.SECRET
function authenticate(req,res,next){
    var payload = jwt.decode(req.headers.auth,secret)

    req.user = payload;
    next();
}

module.exports = {
    authenticate
}