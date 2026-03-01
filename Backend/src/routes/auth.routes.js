const { Router }  = require("express")
const { registercontroller,  logincontroller, getmecontroller,logoutcontroller} = require("../controller/auth.controller")
const authuser = require("../middleware/auth.middleware")


const router = Router()

router.post("/register" , registercontroller)

router.post("/login" , logincontroller)

router.get("/getme" ,authuser ,getmecontroller)

router.post("/logout", authuser,  logoutcontroller)



module.exports = router;