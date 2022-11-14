const BlogsSchema=require("../modle/Blogs-Model")

const BlogsData=async function(req,res){
    try{
    const data=req.body
    const FinalData= await BlogsSchema.create(data)

    if(!FinalData){
        res.status(404).send({status:false,msg:"NOT DATA FOUND "})
    }else{
        res.status(201).send({Mass:FinalData})
    }
}
catch(err){
    res.status(500).send({status:false,mass:"NOT FOUND"})
}
}



const Blogs=async function(req,res){
    try{
    const FinalData= await BlogsSchema.find().populate('authorId')
    if(!FinalData){
        res.status(404).send({status:false,msg:"NO DATA FOUND "})
    }else{
        res.status(201).send({Mass:FinalData})
    }
}
catch(err){
    res.status(500).send({status:false,mass:"NOT FOUND"})
}
}



const blogparams =async function(req,res){
    try{
    const blogInfo=req.params.authorId
    const finalData=await BlogsSchema.findById(blogInfo)
    console.log(finalData)
    res.status(201).send({mass:finalData})
}
catch{
    res.status(500).send({mass:"somthig Wrong"})
}
}





module.exports.blogparams=blogparams
module.exports.BlogsData=BlogsData;
module.exports.Blogs=Blogs;