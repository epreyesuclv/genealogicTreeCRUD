const jwt = require("jsonwebtoken")
require("dotenv").config()
function verifyingToken(req, res, next) {
    let token = req.body.token || req.query || req.headers["access-token"]

    if (!token) {
        return res.status(403).send("token required")
    }
    try {

        const decode = jwt.verify(token, process.env.TOKEN_KEY)
        token = ""
        req.user = decode

    } catch (err) {
        return res.status(401).send("Invalid Token, is posible that your token is outdate, please login again")
    }
    //console.log("authToken " , req.user)
    next()
}




module.exports = {
    verifyingToken
}