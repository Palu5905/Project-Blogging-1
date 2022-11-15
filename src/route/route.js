const express=require("express")
const router=express.Router()

const Author=require("../controller/Author-Controller")
const Blogs=require("../controller/Blogs-Controller")



router.post("/authors",Author.Author)
router.post("/Blogs-Data",Blogs.createBlog)
router.get("/blogs",Blogs.FinalData)

///////=============
router.put("/update-Data/:blogId",Blogs.putBlog)
router.delete("/delete/:BlogId",Blogs.blogdelete)
router.delete("/delete-data",Blogs.blogByQuery)






module.exports=router;