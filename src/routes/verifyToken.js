const jwt = require('jsonwebtoken');
const User = require('../model/User');

const verifyToken = async (req, res, next) => {
    try {
        const bearerHeader = req.headers['authorization'];
        
        if(typeof bearerHeader !== "undefined"){
            const bearer = bearerHeader.split(" ");
            const token = bearer[1];
            const decoded = jwt.verify(token, process.env.TOKEN_KEY);
            const data = await User.findById({"_id" : decoded.id, "name" : decoded.name});
            if(data){
                next();
            }else{
                throw new Error("Unidentified user")
            }
        }else{
            throw new Error("No token provided")
        }
    } catch (error) {
        console.log(error.message);
        return res.status(401).json({auth: false, message: error.message})
    }
}

module.exports = verifyToken;