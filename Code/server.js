//Server.js

//fetching environment variables from file
var env = require('dotenv').config()

//adding all the required modules.
var express     = require('express')
var bodyParser  = require('body-parser')

//getting the declared endpoints
var endpoints   = require('./routes/endpoints')

//initializion
var app         = express()
app.use(bodyParser.json())


app.listen(process.env.httpport,(err)=>{
    if(err){
        console.log('Server has startup issues',err)
    }
    console.log('server is listening on port '+process.env.httpport) 
})
endpoints(app)
