
//------------Import or Require Modules------------//

const BlogsSchema = require("../model/Blogs-Model")
const AutherSchema = require("../model/Author-Model")
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const objectId = mongoose.Types.ObjectId

//--------------post api : Create Blog--------------//

const createBlog = async function (req, res) {
  try {
    let blogData = req.body
    let authorId = req.body.authorId
    if (!objectId.isValid(authorId)) {
      return res.status(400).send({ status: false, msg: "Please Enter valid Author ID" })
    }
    let checkId = await AutherSchema.findById(authorId)

    if (!checkId) {
      return res.status(404).send({ status: false, msg: "no author found with given Id" })
    }
    let savedBlog = await BlogsSchema.create(blogData)
    res.status(201).send({ status: true, message: savedBlog })
  }
  catch (err) {
    res.status(500).send(err)
  }
}

//----------------get api : get Blog -----------------//

const FinalData = async function (req, res) 
  {
  try {
    let blogsInfo = await BlogsSchema.find({$and:[{isdeleted:false,isPublished:true},req.query] });

    if (blogsInfo.length==0) {
      return res.status(404).send({ status: false, msg: "No data matched !" })
    }
    res.send({ filtered_Blogs: blogsInfo })

  }
  catch (err) {
    res.status(500).send({ status: false, msg: "Data Not found" })
  }
}


//----------------PUT api : Update Blog----------// 


const putBlog = async function (req, res) {
  try {
    let data = req.body;
    let id = req.params.blogid;

    if (!id) {
      return res.status(400).send({ status: false, msg: " Please Enter blogId Id On params ", });
    }
    if (!data.subcategory) {
      return res.status(400).send({ status: false, msg: "Subcategory is Required, Please Enter ", });
    }

    let blogFound = await BlogsSchema.findOne({ _id: id });

    if (!blogFound) {
      return res.status(400).send({ status: false, msg: " Id Does Not Exist" });
    }

    let updatedBlog = await BlogsSchema.findOneAndUpdate(
      { _id: id },
      {
        $push: {  subcategory: data.subcategory },
      },
      { new: true, upsert: true }
    );

    if (updatedBlog) {
      return res.status(200).send({ status: true, data: updatedBlog });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};


//--------------Delete api : Delete Blog------------// 

const blogdelete = async (req, res) => {
  try {

    let blogId = req.params.Blogid
    let findId = await BlogsSchema.findById(blogId)
    if (!findId || !findId.isdeleted == true) {
      return res.status(400).send({ status: false, msg: "No Blogs Present" })
    }
    let deleteblog = await BlogsSchema.findOneAndUpdate({ _id: blogId }, { $set: { isdeleted: true }, deletedAt: Date.now() })
    return res.status(200).send({ status:true, data: deleteblog, msg: "blog deleted successfully" })
  }
  catch (error) {
    return res.status(500).send(error)

  }
}

//-------------Delete api : Delete Blog by Query-----------------//

const blogByQuery = async (req, res) => {
  try {
    const data = req.query;
    let id = req.query.isdeleted
    let Id = req.query.authorId

    const { authorId } = data;
    if (!authorId) {
      return res.status(404).send({ status: false, message: "Author Id is Mandatory" });
    }

    const deleteByQuery = await BlogsSchema.updateMany(
      { _id: id, _id: Id }

      , {
        $set: { isdeleted: true },
      },
      { new: true }
    );

    if (deleteByQuery) {
      res.status(200).send({ status: true, msg: "Your blogs have been deleted", data: deleteByQuery, });
    }
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
}




module.exports = { createBlog, FinalData, putBlog, blogdelete, blogByQuery }


