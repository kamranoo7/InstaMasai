let express=require("express")
const { PostModel } = require("../Model/post.mdoel")
let postRouter=express.Router()

postRouter.post("/add",async(req,res)=>{

    try{
        let post=new PostModel(req.body)
        await post.save()
        res.status(200).json({msg:"new post has been created","post":req.body})

    }catch(err){
res.status(400).json({error:err.message})
    }

})
postRouter.get("/",async(req,res)=>{
    try{
        let post =await PostModel.find()
        res.status(200).send(post)

    }catch(err){
        res.status(400).json({error:err.message})
    }
    
})
postRouter.patch("/update/:postID",async(req,res)=>{

    let {postID}=req.params
    let post =await PostModel.findOne({_id:postID})
    try{
        if(req.body.userID!==post.userID){
            res.status(200).send({"msg":"You are not Authorised"})
        }else{
await PostModel.findByIdAndUpdate({_id:postID},req.body)
res.status(200).json({msg:"The post has been Updated"})
        }
    }catch(err){
        res.status(400).json({error:err.message})
    }
    
})
postRouter.delete("/delete/:postID",async(req,res)=>{
    let {postID}=req.params
    let post =await PostModel.findOne({_id:postID})
    try{
        if(req.body.userID!==post.userID){
            res.status(200).send({"msg":"You are not Authorised"})
        }else{
await PostModel.findByIdAndDelete({_id:postID},req.body)
res.status(200).json({msg:"The post has been deleted"})
        }
    }catch(err){
        res.status(400).json({error:err.message})
    }
    
})

module.exports={
    postRouter
}