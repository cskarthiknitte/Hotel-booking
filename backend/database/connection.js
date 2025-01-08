//karthik2003
//mongodb+srv://poojarykarthi79:karthik2003@cluster0.l740u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

const mongoose = require('mongoose');

function RunServer(){
    try {
        mongoose.connect(process.env.MONGO_URL);
        console.log('MongoDb Connected');
    } catch (error) {
        console.log(error);
    }
}

module.exports = RunServer;