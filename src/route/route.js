const express = require("express")
const router = express.Router()
const Authors = require("../controller/Author-Controller")
const Blogs = require("../controller/Blogs-Controller")
const Mymiddleware = require("../middleware/middleware")

///>>>>>>>>> DAY FIRST API <<<<<<<<<=================
router.post("/authors", Authors.Author)
router.post("/Blogs", Mymiddleware.MiddleWare, Blogs.createBlog)
router.get("/blogs", Mymiddleware.MiddleWare, Blogs.FinalData)

////>>>>>>>>>>> DAY 2nd API  <<<<<<<<<<===================

router.put("/update-Data/:blogId", Mymiddleware.MiddleWare, Blogs.putBlog)
router.delete("/delete/:BlogId", Mymiddleware.MiddleWare, Blogs.blogdelete)
router.delete("/delete-data", Mymiddleware.MiddleWare, Blogs.blogByQuery)

//////========== DAY 3rd API  <<<<<<<<<<<<<========================

router.post("/login-User", Blogs.loginData)





module.exports = router;