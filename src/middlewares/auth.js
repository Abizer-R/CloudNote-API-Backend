const jwt = require("jsonwebtoken")
const SECRET_KEY = process.env.SECRET_KEY

const auth = (req, res, next) => {

    try {
        
        let token = req.headers.authorization;
        if(!token) {    // if token is not returned or some other problem
            return res.status(401).json({message : "Unauthorized User"})
        }

        // token = "Bearer ____", therefore we extract actual token by splitting
        token = token.split(" ")[1];

        // The received token is a jwt token
        // we extract the details by decrypting the token
        let user = jwt.verify(token, SECRET_KEY)

        // we add the user's ID into the 'req' object before forwarding to next() function
        req.userId = user.id;

        next()

    } catch (error) {
        console.log(error)
        return res.status(401).json({message : "Unauthorized User"})
    }
}

module.exports = auth;