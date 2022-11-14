const express=require("express")
const router=express.Router()

const Author=require("../controller/Author-Controller")
const Blogs=require("../controller/Blogs-Controller")




router.post("/authors",Author.Author)
router.post("/Blogs-Data",Blogs.BlogsData)
router.get("/Blogs",Blogs.Blogs)
router.get("/Blogs-params/:authorId",Blogs.blogparams)





module.exports=router;