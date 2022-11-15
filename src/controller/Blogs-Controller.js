const BlogsSchema = require("../modle/Blogs-Model")
const AutherSchema = require("../modle/Author-Model")


const createBlog = async function (req, res) {

  try {
    let blogData = req.body

    let authorId = req.body.authorId
    let checkId = await AutherSchema.findById(authorId)
    if (!checkId) {
      return res.status(400).send({ msg: "Plase Enter valid Author ID" })
    }
    let savedBlog = await BlogsSchema.create(blogData)
    res.status(201).send({ message: savedBlog })
  }
  catch (err) {
    res.status(500).send(err)
  }
}


const FinalData = async function (req, res) {
  try {
    let categoryParams = req.query.category
    let blogsInfo = await BlogsSchema.findOne({ category: categoryParams });

    if (!blogsInfo) {
      return res.status(404).send({ msg: "No data matched !" })
    }
    res.send({ filtered_Blogs: blogsInfo })

  }
  catch (err) {
    res.status(500).send({ status: false, msg: "DATA NOT FOUND" })
  }
}


const putBlog = async function (req, res) {
  try {
    let data = req.body;
    let id = req.params.blogId;

    if (!id) {
      return res.status(400).send({ status: false, msg: " Plase Enter blogId Id On params ", });
    }

    if (!data.subcategory) {
      return res.status(400).send({ status: false, msg: "subcategory is required plase Enter ", });
    }

    let blogFound = await BlogsSchema.findOne({ _id: id });

    if (!blogFound) {
      return res.status(400).send({ status: false, msg: " Id are Not exist" });
    }

    let updatedBlog = await BlogsSchema.findOneAndUpdate(
      { _id: id },
      {
        $set: { subcategory: data.subcategory, publishedAt: Date.now() }
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


const blogdelete = async (req, res) => {
  try {

    let blogId = req.params.BlogId
    let findId = await BlogsSchema.findById(blogId)
    if (!findId || findId.isdeleted == false) {
      return res.status(400).send({ status: true, msg: "no blogs present" })
    }
    let deleteblog = await BlogsSchema.findOneAndUpdate({ _id: blogId }, { $set: { isdeleted: true }, deletedAt: Date.now() })
    return res.status(200).send({ data: deleteblog, msg: "blog deleted successfully" })
  }
  catch (error) {
    return res.status(500).send(error)

  }
}


const blogByQuery = async (req, res) => {
  try {
    const data = req.query;
    let id =req.query.isdeleted
    let Id =req.query.authorId

    const { authorId } = data;
    if (!authorId) {
      return res.status(404).send({ status: false, message: "Author Id is Mandatory" });
    }

    const deleteByQuery = await BlogsSchema.updateMany(
        {_id:id,_id:Id}

        ,{
          $set:{ isdeleted: true },
        },
        { new: true }
      );

    if (deleteByQuery) {
      res.status(200).send({status: true,msg: "Your blogs have been deleted", data: deleteByQuery,});
    }
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
}







module.exports.blogByQuery=blogByQuery



module.exports.blogdelete = blogdelete

module.exports.putBlog = putBlog
module.exports.FinalData = FinalData
module.exports.createBlog = createBlog