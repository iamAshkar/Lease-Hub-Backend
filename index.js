require('dotenv').config()


const express = require('express')
const cors = require('cors')

const db = require('./DB/connection');

const lsServer = express()

const router = require('./Routes/router')


lsServer.use(cors())
lsServer.use(express.json())
lsServer.use(router)


lsServer.use('/uploads',express.static('./uploads'))




const PORT = 4003 || process.env.port

lsServer.listen(PORT,()=>{
    console.log('lsserver listening on port '+PORT);
})

lsServer.get('/',(req,res)=>{
res.send("welcome to leasing app")
})