//route post
//desc test private
// access private(chi cho nhung user da login)
const jwt = require("jsonwebtoken")
const authenticating = (req, res, next) => {
    //verify token -
//
//
    const token = req.header("Authorization");
    const fingerprint =  req.header("fingerprint");
    const key =  "Cybersoft" + fingerprint
    try {
    
    const decoded = jwt.verify(token,key) 
        req.user = decoded;    
        next()
    }
    catch(error) {
        res.status(403).json({errors : "ban k the xem"})
    }   
}
const authorizing = (userTypeArry) => {
    return(req, res, next) => {
        const {userType} = req.user;
        //userTypeArray : danh sach cac loai nguoi dung co the truy cap
        //usertype : loai nguoi dung hien tai "lay tu decoded token"
        //neu usertype co chua usertype => next
        console.log(userType)
        if(userTypeArry.indexOf(userType) > -1){
            return next()
        }else{
            res.status(403).json({error : "ban da dang nhap nhugn k co quyen xem dieu nay"})
        }
    }
} 
module.exports = {
    authenticating,authorizing
}
