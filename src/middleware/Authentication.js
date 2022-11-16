const BlogsModel = require("../model/Blogs-Model");
let id =req.params.blogId
const author=await BlogsModel.findById(id)
author.authorId=req.id