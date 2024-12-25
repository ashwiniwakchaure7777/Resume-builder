const mongoose = require('mongoose');

module.exports.dbConnection = ()=>{
    try{
        mongoose.connect(process.env.MONGODB_URI);
        console.log("Database connection success!")
    }catch(error){
        console.log("Database connection issue",error);
    }
}
