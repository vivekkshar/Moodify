const { Router }  = require("express")
const { registercontroller,  logincontroller} = require("../controller/auth.controller")


const router = Router()

router.post("/register" , registercontroller)

router.post("/login" , logincontroller)

module.exports = router;