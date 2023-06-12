let jwt=require("jsonwebtoken")
let auth=(req,res,next)=>{
let token=req.headers.authorization
if(token){
    try{
        let decoded=jwt.verify(token.split(" ")[1],"masai")
        if(decoded){
            req.body.userID=decoded.userID
            req.body.user=decoded.user
            next()
        }else{
            res.send({"msg":"Please Login First"})
        }

    }catch(err){
res.status(400).json({error:err.message})
    }
}else{
    res.send({"msg":"Please Login"})
}
}


module.exports={
    auth
}