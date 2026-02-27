
const app = require("./src/app")
const connecttodb = require("./src/config/database")




connecttodb()

app.listen(3000, ()=>{
    console.log("server is running on the port of 3000")
})