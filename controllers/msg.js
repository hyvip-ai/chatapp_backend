const Messege = require('../models/messege')
const Groupmessege = require('../models/grpmsg')

const Group = require('../models/group')

const Request = require('../models/request')

const Connection = require('../models/connection')
const moment = require('moment');

function postmessege(req,res){
    var messege = new Messege();
    messege.sender = req.user.sub;
    messege.receiver = req.params.id;
    messege.text = req.body.text;
    messege.time = moment().unix();
    messege.viewstatus = 'false';

    messege.save((err,saved)=>{
        if(err){
            return res.send({messege:'Not Send'})
        }
        if(saved){
            return  res.send({messege:saved})
        }
    })
}

function getunread(req,res){
    Messege.find({$and:[
        {viewstatus:'false'},
        {receiver:req.user.sub}
    ]}).populate('sender').exec((err,all)=>{
        if(err){
            return res.send({messege:'error occured'})
        }
        if(all){
            return res.send({messeges:all})
        }
    })
}

function getconversation(req,res){
Messege.find({$and:[
    {sender:req.user.sub},
    {receiver:req.params.id}
]}).sort('time').exec((err,msg)=>{
    if(err){
        return res.send({messege:'error occured'})
    }
    if(msg){
        return res.send({messege:msg})
    }
})
}

function getreceivedmessege(req,res){
    Messege.find({receiver:req.user.sub}).exec((err,messeges)=>{
        if(err){
            return res.send({messege:'Érror Occured'});
        }
        if(messeges){
            return res.send({data:messeges})
        }
    })
}
function creategroup(req,res){
    // console.log(req.params.id)
Group.findOne({grpname:req.params.id}).exec((err,groups)=>{
    // console.log(groups)
    if(err){
        return res.send({messege:'Error Occured'})
    }

    if(groups){
        // console.log('asche ekhane')
        // console.log(groups)
        return res.send({messege:'A group with same name already exists'})
    }
    else{
        // console.log('asche ekhane main')

        var group = new Group();
        group.members.push(req.user.username);
        group.grpname = req.params.id;
        group.createdby = req.user.username;
        group.createdat=moment().unix();
        group.save((err,savedgroup)=>{
            if(err){
                return res.send({messege:'Error Occured'})
            }
            if(savedgroup){
                // console.log(savedgroup)
               return res.send({group:savedgroup})
            }
        }) 
    }


})

}

function groupdetails(req,res){
    Group.findOne({grpname:req.params.id}).exec((err,group)=>{
        if(err){
            return res.send({messege:'Error Occured'})
        }
        if(group){
            return res.send({group:group})
        }
    })
}

function joingroup(req,res){
    Group.findOneAndUpdate({grpname:req.params.id},{$push:{members:req.user.username}}).exec((err,group)=>{
        if(err){
            return res.send({messege:'Error Occured'})
        }
        if(group){
            
            console.log(group)
            return res.send({group:group});
        }
        else{
            return res.status(404).send({messege:'Check the Group Name'})
        }
    })
}
function postgrpmessege(req,res){

    var grpmsg = new Groupmessege();
    grpmsg.sender = req.user.sub;
    grpmsg.text = req.body.text;
    grpmsg.grpname = req.params.id
    grpmsg.time = moment().unix();
    console.log(grpmsg)
    grpmsg.save((err,saved)=>{
        if(err){
            return res.send({messege:'Error Occured'})
        }
        if(saved){
            return res.send({messege:saved})
        }
    })

}

function getallgrpmessege(req,res){

    Groupmessege.find({grpname:req.params.id}).populate('sender').exec((err,messeges)=>{
        if(err){
            return res.send({messege:'Error Occured'})

        }
        
        if(messeges){
            return  res.send({messeges:messeges})
        }
    })
}

function leavegrp(req,res){
    Group.updateOne({grpname:req.params.id},{$pullAll:{members:[req.user.username]}}).exec((err,done)=>{
        if(err){
            return res.send({messege:'Error Occured'})
        }
        else{
            return res.send({group:done})
        }
    })
}

function createrequest(req,res){
    // console.log(req.user.sub,req.params.id)
  Connection.findOne({$and:[
      {sender:req.user.sub},
      {receiver:req.params.id}
  ]}).exec((err,found)=>{
      if(err){
        return res.send({messege:'Error Occured'})
      }

      if(found){
        return res.status(400).send({messege:'Already There'})
      }
      else{
        var request = new Connection();

        request.sender = req.user.sub;
        request.receiver = req.params.id;
        request.status = 'pending'

        request.save((err,saved)=>{
            if(err){
                res.send({messege:'Error Occured'})
            }
            if(saved){
                res.send({messege:saved})
            }
        })
        


      }
  
        
    })
  }

function clearallrequest(req,res){

    Connection.find({$and:[
        {sender:req.user.sub},
        {status:'pending'},
        {receiver:req.params.id}
    ]}).remove().exec((err,data)=>{
        if(err){
            return res.send({messege:'Error Occured'})
        }

        if(data){
            return res.send({messege:'Deleted'})
        }
        else{
            return res.status(400).send({messege:'It Doesnt exist'})
        }

    })

}

function getallrequest(req,res){

    Connection.find({$and:[
        {receiver:req.user.sub},
        {status:'pending'}
    ]}).populate('receiver').populate('sender').exec((err,data)=>{
        if(err){
            return res.send({messege:'Error Occured'})

        }
        if(data){
            return res.send({messege:data})

        }
    })

}

function acceptrequest(req,res){

}
function rejectrequest(req,res){
    console.log(req.params.id)


    Connection.findOneAndDelete({_id:req.params.id}).exec((err,data)=>{
        if(err){
            return res.send({messege:'Error Occured'});
        }
        if(data){
            return res.send({messege:'Deleted'})
        }
    })

}


module.exports = {
    postmessege,
    getconversation,
    getunread,
    getreceivedmessege,
    postgrpmessege,
    getallgrpmessege,
    creategroup,
    creategroup,
    joingroup,
    groupdetails,
    leavegrp,
    createrequest,
    clearallrequest,
    getallrequest,
    acceptrequest,
    rejectrequest
}