
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('./config');

const authMiddleware = (req, res, next)=>{
    
    const authHeader = req.headers.authorization; //This line will extract the value of authorization which will contain the token for authentication in Bearer <token> format
    
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(403).json({
            message:"inside authmiddleware"
        });    
    }

    const token = authHeader.split(' ')[1];

    try{
        const decoded = jwt.verify(token,JWT_SECRET)
        console.log(decoded)
        req.userId = decoded.userId;
        console.log(req.userId)
        next();
    }catch(err){
        console.error(err)
        return res.status(403).json({message: "THis is error"});
    }
}

module.exports = {
    authMiddleware,
}