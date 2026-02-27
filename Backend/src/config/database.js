require("dotenv").config()
const mongoose =  require("mongoose")


async function connecttodatabase(){
    await mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("connect to db ")
    })

}


module.exports = connecttodatabase;