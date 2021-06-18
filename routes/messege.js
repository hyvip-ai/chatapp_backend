const express = require('express')

const api = express.Router()

const messege_controller = require('../controllers/msg')
const  md_auth = require('../middlewares/authenticate')
api.post('/sendmessege/:id',md_auth.authenticate,messege_controller.postmessege)
api.get('/allunread',md_auth.authenticate,messege_controller.getunread)
api.get('/getconversation/:id',md_auth.authenticate,messege_controller.getconversation)

api.get('/getreceivedmesseges/:id',md_auth.authenticate,messege_controller.getreceivedmessege)

api.get('/creategroup/:id',md_auth.authenticate,messege_controller.creategroup);
api.get('/joingroup/:id',md_auth.authenticate,messege_controller.joingroup)
api.post('/postgrpmessege/:id',md_auth.authenticate,messege_controller.postgrpmessege)

api.get('/groupdetails/:id',md_auth.authenticate,messege_controller.groupdetails)

api.get('/getgrpmesseges/:id',md_auth.authenticate,messege_controller.getallgrpmessege)

api.get('/leavefromgrp/:id',md_auth.authenticate,messege_controller.leavegrp)

api.get('/creeterequest/:id',md_auth.authenticate,messege_controller.createrequest)

api.get('/deleteallrequest/:id',md_auth.authenticate,messege_controller.clearallrequest)
api.get('/getallrequests',md_auth.authenticate,messege_controller.getallrequest)

api.get('/acceptrequest/:id',md_auth.authenticate,messege_controller.acceptrequest)
api.get('/rejectrequest/:id',md_auth.authenticate,messege_controller.rejectrequest)


module.exports = api



