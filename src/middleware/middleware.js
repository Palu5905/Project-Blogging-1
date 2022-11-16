const jwt=require('jsonwebtoken')


const MiddleWare = function(req,res,next){
try{
    let tokenHeader = req.headers["x-auth-token"];
  
    if (!tokenHeader)
      res.status(400).send({ Status: false, msg: "Please Enter Token" })
  
    const functionup = jwt.verify(tokenHeader, "Blog-Project",(err,decoded)=>{

     if(err){
      return res.status(401).send({ status: false, msg: err.message });
     }else{
        req.decoded=decoded 
        req.id=functionup.UserId
        next()
     }});

    }
catch(err){
    res.status(500).send({status:false, msg:err.message})
}
}

module.exports.MiddleWare=MiddleWare;



