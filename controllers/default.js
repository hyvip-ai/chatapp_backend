function status(req,res){
    return res.send({
        name:'Chit-Chat',
        version:'1.0.0',
        status:'Running kono mote'
    })
}

module.exports = {
    status
}