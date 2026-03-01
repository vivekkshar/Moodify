const userModel = require("../model/user.model")
const blacklistModel = require("../model/blacklist.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")


 async function  registercontroller(req, res ){
    
     const {username, email, password} = req.body

     const isuseralreadyexists = await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
     })
      
     if(isuseralreadyexists){
        return res.status(400).json({
            message:"user already exists with same email and username "
        })
     }
     

     const hash  = await  bcrypt.hash(password , 10)

     const user = await userModel.create({
        username,
        email, 
        password: hash
     })
     

     const token  = jwt.sign({
        id: user._id,
        username : user.username
     }, process.env.jwt_secert,
    {
        expiresIn:"1d"
    })

    console.log(token)

     res.cookie("token", token)

    res.status(201).json({
        message:"user registered successfully ",
        user
    })

}

async function  logincontroller(req, res ){

    const {username, email, password} =  req.body

    const user =  await  userModel.findOne({
        $or:[
            {email},
            {username}
        ]
    }).select("+password")

    

    if(!user){
        return res.status(400).json({
            message:"invalid credentials"
        })
    }

    const ispasswordvalid = await bcrypt.compare(password, user.password)

    if(!ispasswordvalid){
        return res.status(404).json({
            message:"invalid credentials"
        })
    }

    const token  = jwt.sign({
        id: user._id,
        username : user.username
     }, process.env.jwt_secert,
    {
        expiresIn:"1d"
    })

    res.cookie("token", token)

    res.status(201).json({
        message:"user login successfully ",
        user
    })


    
}

async function getmecontroller(req, res){
    
    const user = await userModel.findById(req.user.id)

    if(user){
        return res.status(201).json({
            message:"user fetched successfully",
            user
        })
    }


}


async function logoutcontroller(req, res){
    const token = req.cookies.token

    await blacklistModel.create({token})

    res.clearCookie("token")

    const user = await userModel.findByIdAndDelete(req.user.id)
    
    res.status(201).json({
        message:"user deleted successfully "
    })

}


module.exports = {
    registercontroller,
    logincontroller,
    getmecontroller,
    logoutcontroller
}