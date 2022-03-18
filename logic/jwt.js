const session = require("express-session");
const jwt = require('jsonwebtoken');
var cred = require('../config/config');

const verifyToken = (req, res, next)=>{
        
    const Token = req.session.token;
    if(!Token) {      
        return res.status(403).send("A token is required for authentication try /Login");
    }
    try{
        const decode = jwt.verify(Token,cred.secret);
        session.user=decode;
    }catch(err){
        return res.status(401).send("Invalid token try /Login");
    }
    return next();
    
}

module.exports = verifyToken;