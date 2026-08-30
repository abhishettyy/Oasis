const mongoose = require('mongoose');
module.exports = async function(){
    try{
        await mongoose.connect(process.env.DB_URL)
        console.log("DB connected successfully")
    }
    catch(err){
        console.log(err)
    }
}