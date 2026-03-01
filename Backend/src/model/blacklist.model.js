
const mongoose = require("mongoose")

const blacklistSchema = new mongoose.Schema({
    token:{
        type:String,
        required:[true , "token is required for blacklisting."]
    }
},{
    timestamps:true
})


const blacklistModel = mongoose.model("blacklisttoken", blacklistSchema )


module.exports =  blacklistModel;