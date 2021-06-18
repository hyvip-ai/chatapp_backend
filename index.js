require('dotenv').config();

const port = process.env.PORT || 3000
const mongodb = process.env.MONGO_URL || 'mongodb://localhost:27017/chatting';
const express = require('express')
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const default_routes = require('./routes/default')
const user_routes = require('./routes/user')
const messege_routes = require('./routes/messege')
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))
mongoose.connect(mongodb , { useNewUrlParser : true, useUnifiedTopology : true})
.then((res)=>{
    app.listen(port,()=>{
        console.log('> Connected...');
        console.log('> Write Some Code Shithead')
    })
})
.catch(err=>console.log(`> Error while connecting to mongoDB : ${err}`))

app.use('/',default_routes)
app.use('/api',user_routes);
app.use('/api',messege_routes)