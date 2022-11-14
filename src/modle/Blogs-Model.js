const mongoose=require('mongoose')
const objectId = mongoose.Schema.Types.ObjectId

const BlogsSchema=new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    body : {
        type : String,
        required : true
    },
    authorId :{
        type : objectId,
        ref : 'My-Author-Data',
        required : true
    },
    tags :  [String],
    category : {
        type : String,
        required : true
    },
    subcategory :{
        type : [String]
    },
    deletedAt : {
        type :String
    },
    isdeleted :{
        type : Boolean,
        default : false
    },
    publishedAt :{
        type : Date
    }, 
    isPublished : {
        type : Boolean,
        default : false
    }
},{timestamps: true})
   
module.exports=mongoose.model("My-Blogs-Data",BlogsSchema)