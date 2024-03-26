const {JWT_SECRET} = require('./config');
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next)=>{
    // const authHeader = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImhhcmtpcmF0QGdtYWlsLmNvbSIsImlhdCI6MTcwNDIyNDUyOX0.bvtvY7SL3k4tPMd8YkJ1ViFPc-n9EBgFoBfz88uyW8c"
    const authHeader = req.headers.authorization; //This line will extract the value of authorization which will contain the token for authentication in Bearer <token> format
    
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(403).json({});    
    }

    const token = authHeader.split(' ')[1];
    console.log(token);
    try{
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.userId;
        next();
    }catch(err){
        return res.status(403).json({});
    }
}

module.exports = {
    authMiddleware,
}