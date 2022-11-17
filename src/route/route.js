const express = require("express")
const router = express.Router()
const Authors = require("../controller/Author-Controller")
const Blogs = require("../controller/Blogs-Controller")
const Mymiddleware = require("../middleware/middleware")

///>>>>>>>>> DAY FIRST API <<<<<<<<<=================
router.post("/authors", Authors.Author)
router.post("/blogs" , Blogs.createBlog)
router.get("/blogs", Mymiddleware.Authorization , Blogs.FinalData)

////>>>>>>>>>>> DAY 2nd API  <<<<<<<<<<===================

router.put("/blogs/:blogid", Mymiddleware.Authorization , Blogs.putBlog)
router.delete("/blogs/:blogid", Mymiddleware.Authorization , Blogs.blogdelete)
router.delete("/blogs", Mymiddleware.Authorization , Blogs.blogByQuery)

//////========== DAY 3rd API  <<<<<<<<<<<<<========================

router.post("/login", Authors.loginData)

router.post('/create',Authors.anjali)


module.exports = router;