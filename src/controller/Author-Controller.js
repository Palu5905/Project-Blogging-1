const AutherSchema=require("../modle/Author-Model")



const Author=async function(req,res){
    try{
    const AuthorData=req.body
    const FinalData= await AutherSchema.create(AuthorData)
    if(!FinalData){
        res.status(404).send({status:false,msg:"NO DATA FOUND"})
    }else{
        res.status(201).send({status:true,mass:FinalData})

    }
}
catch(err){
    res.status(500).send({status:false,mass:"NOT Found"})
}
}




module.exports.Author=Author;