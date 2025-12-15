const mongoose=require("mongoose");

async function constDB() {
    return mongoose.connect(process.env.MONGO_URI);    
}

module.exports=constDB;