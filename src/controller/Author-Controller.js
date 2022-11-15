const AutherSchema=require("../modle/Author-Model")



const Author=async function(req,res){
    try{
    const AuthorData=req.body
    const FinalData= await AutherSchema.create(AuthorData)
  res.send({msg:FinalData})
}
catch(err){
    res.status(500).send({status:false,mass:"NOT Found"})
}
}




module.exports.Author=Author;