const AutherSchema = require("../model/Author-Model")
const mongoose=("mongoose")
const {isValidEmail,isValidPassword,isValidString}=require('../validater/validater')


const Author = async function (req, res) {
  try {
    const {FirstName,LastName,email,password} = req.body
    if(!isValidEmail(email)) return res.status(400).send({msg: "please enter vilid email Id"})
    if(!isValidPassword(password)) return res.status(400).send({msg: "please enter vilid password Id"})
    if(!isValidString(FirstName)) return res.status(400).send({msg: "please enter vilid FirstName Id"})
    if(!isValidString(LastName)) return res.status(400).send({msg: "please enter vilid lastname Id"})
    

    const FinalData = await AutherSchema.create(AuthorData)
    res.send({ msg: FinalData })
  }
  catch (err) {
    res.status(500).send({ status: false, msg: " Data Not Found" })
  }
}


module.exports.Author = Author;