let express=require('express')
const { UserModel } = require('../Model/user.model')
let bcrypt=require("bcrypt")
let userRouter=express.Router()
let jwt=require("jsonwebtoken")
userRouter.post("/register",async(req,res)=>{
let {name,email,gender,password,age,city,is_married}=req.body
let user=await UserModel.findOne({email})
if(user){
    res.status(2000).json({msg:"User already exist, please login"})
}else{
    try{
bcrypt.hash(password,5,async(err,hash)=>{
    let user=new UserModel({email,name,gender,password:hash,age,city,is_married})
    await user.save()
    res.status(200).json({msg:"new user has been registerd"})
})

    }catch(err){
        res.status(400).json({error:err.message})
    }
}
})



userRouter.post("/login",async(req,res)=>{
    let {email,password}=req.body
    try{
        let user=await UserModel.findOne({email})
        if(user){
            bcrypt.compare(password,user.password,(err,result)=>{
                if(result){
                    let token=jwt.sign({userID:user._id,user:user.name},"masai",{
                        expiresIn:7*86400
                    })
                    res.status(200).json({msg:"Login Successfull","token":token})
                }else{
                    res.status(400).json({msg:"Wrong Credential"})
                }
            })
        }

    }catch(err){
        res.status(400).json({error:err.message})
    }
})
userRouter.get("/logout",(req,res)=>{
    let token=req.headers.authorization?.split(" ")[1]
    try{
        backlist.push(token)
        res.status(200).json({msg:"User has been logged out"})
    }catch(err){
        res.status(400).json({error:err.message})
    }
})

module.exports={
    userRouter
}