const User = require('../models/user')
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../service/token')

function register(req,res){
    const params = req.body;
    var user = new User();

    // console.log(params)
    if(params.name && params.username && params.password){
        
       User.find({username:params.username}).exec((err,users)=>{
           if(err){
               return res.send({messege:'Finding Error'})
           }
           if(users && users.length>=1){
               return res.send({messege:'Change The Username'});
           }
           else{
               user.username = params.username;
               user.name = params.name;
               bcrypt.hash(params.password,null,null,(err,hashpass)=>{
                   if(err){
                       return res.send({messege:'Hash Making error'})
                   }
                   user.password = hashpass;
                 
               })
               console.log(user)
          user.save((err,saved)=>{
              if(err){
                return res.send({messege:'Error Occured'})
              }
              if(saved){
                  return res.send({messege:saved})
              }
          })
       }
       })

    }
    else{
        return res.send({messege:'Invalid Data'});
    }

}

function login(req,res){
    // console.log('asche')
    const params = req.body;
// console.log(params)
    if(params.username && params.password){
        User.findOne({username:params.username}).exec((err,user)=>{
            if(err){
                return res.send({messege:'Finding Error'});
            }
            if(user){
                bcrypt.compare(params.password,user.password,(err,result)=>{
                    if(err){
                        return res.send({messege:'Wrong Password'})
                    }
                    if(result){
                        return res.send({user:user,token:jwt.createtoken(user),messege:'Matched'})
                    }
                })
            }
            else{
                return res.send({messege:'Wrong Username'})
            }
        })
    }
    else{
        return res.send({messege:'Invalid Data'});
    }
}


function getdetails(req,res){

    var user = req.user;
    return res.send({user:user})

}

function getallusers(req,res){
    User.find({username:{$ne : req.user.username}}).exec((err,users)=>{
        if(err){
            return res.send({messege:'Error Occured'})
        }
        if(users){
            return res.send({users:users})
        }
    })
}

module.exports = {

    register,
    login,
    getdetails,
    getallusers
}