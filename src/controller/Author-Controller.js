const AutherSchema = require("../model/Author-Model")
const mongoose = ("mongoose")
const { isValidEmail, isValidPassword, isValidString } = require('../validater/validater')
const jwt = require('jsonwebtoken')

 const anjali  = async function(req,res){
  const result =req.body
  const finalinfo=await AutherSchema.create(result)
  res.send({mass:finalinfo})
 }




//---------------post api : Create Author----------------//

const Author = async function (req, res) {
  try {
    const { FirstName, LastName, email, password } = req.body
    if (!isValidEmail(email))
      return res.status(400).send({ status: false, msg: "please enter vilid email Id" })
    if (!isValidPassword(password))
      return res.status(400).send({ status: false, msg: "please enter vilid password Id" })
    if (!isValidString(FirstName))
      return res.status(400).send({ status: false, msg: "please enter vilid FirstName Id" })
    if (!isValidString(LastName))
      return res.status(400).send({ status: false, msg: "please enter vilid lastname Id" })

    const FinalData = await AutherSchema.create({FirstName, LastName, email, password})
    res.send({ msg: FinalData })
  }
  catch (err) {
    res.status(500).send({ status: false, msg: " Data Not Found" })
  }
}

//--------------------post api : Login Author------------------//

const loginData = async function (req, res) {
  try {
    let { emailId, pass } = req.body

    let userInfo = await AutherSchema.findOne({ email: emailId, password: pass });
    console.log(userInfo)

    if (!userInfo)
      return res.status(400).send({ Status: false, massage: "Plase Enter Valid UserName And Password" })
    console.log(userInfo._id.toString())
    let userToken = jwt.sign({
      UserId: userInfo._id.toString()
    },
      'Blog-Project'
    )
    res.status(200).send({ Msg: " Your JWT Token is successful generated", Status: true, MyToken: userToken })
  }
  catch (err) {
    res.status(500).send({ status: false, errer: err })
  }
}




module.exports = { loginData, Author ,anjali};