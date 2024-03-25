const {JWT_SECRET} = require('./config');
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next)=>{
    const authHeader = req.headers.authorization; //This line will extract the value of authorization which will contain the token for authentication in Bearer <token> format
    
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(403).json({});    
    }
    
    const token = authHeader.split(' ')[1];

    try{
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.userId;
        next();
    }catch(err){
        return res.status(403).json({});
    }
}

module.exports = {
    authMiddleware 
}