const jwt = require("jsonwebtoken")
const authenticating = (req, res, next) => {
    //verify token -
    const token = req.header("Authorization");
    const fingerprint =  req.header("fingerprint");
    const key =  "Cybersoft" + fingerprint
    try{  
        const decoded = jwt.verify(token,key) 
        req.user = decoded;    
        next()
    }
    catch(error){
        res.status(403).json({errors : "Not Authorization"})
    }   
}
const authorizing = (userTypeArry) => {
    return(req, res, next) => {
        const {userType} = req.user;
        if(userTypeArry.indexOf(userType) > -1){
            return next()
        }else{
            res.status(403).json({error : "Logined but No Authorization"})
        }
    }
} 
module.exports = {
    authenticating,authorizing
}
