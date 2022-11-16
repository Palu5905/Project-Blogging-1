const mongoose = require('mongoose')

const AuthorSchema = new mongoose.Schema({
    FirstName: {
        type: String,
        require: true
    },
    LastName: {
        type: String,
        require: true
    },
    title: {
        type: String,
        enum: ["Mr", "Mrs", "Miss"],
        require: true
    },
    email: {
        require: true,
        type: String,
        unique: true
    },
    password: {
        require: true,
        type: String

    }
}, { timestamps: true })


module.exports = mongoose.model("My-Author-Data", AuthorSchema)