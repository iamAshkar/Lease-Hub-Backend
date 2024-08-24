const mongoose = require('mongoose')

const connectionString = process.env.DATABASE

mongoose.connect(connectionString).then(()=>{
    console.log("Mongodb atlas connection established");
})
.catch ((error)=>{
    console.log("MongoDb atlas connection error" , error);
})