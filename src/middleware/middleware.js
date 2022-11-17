const jwt = require('jsonwebtoken')

//------------------Authentication-----------------//

const Authorization = function (req, res, next) {
  try {
    let tokenHeader = req.headers["x-auth-token"];

    if (!tokenHeader)
      res.status(400).send({ Status: false, msg: "Please Enter Token" })

    const functionup = jwt.verify(tokenHeader, "Blog-Project")

      if (!functionup) {
        return res.status(401).send({ status: false, msg:"gjhgkhkhj" });
      } else {
        req.id = functionup.UserId
        next()
      }

}
  catch (err) {
    res.status(500).send({ status: false, msg: err.message })
  }
}

module.exports.Authorization = Authorization;



