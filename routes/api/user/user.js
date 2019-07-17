
const { User } = require("../../../model/user");
const bcrypt = require("bcryptjs");
const jwt =require("jsonwebtoken")
const multer = require('multer')
const validateRegisterInput = require('../../../validation/validateRegister')
// router.get("/",( req, res, next) => {
//     console.log("mi 1")
//     next()
// },(res,req,next) => {
//         console.log("mi 2")
//         next()
//     },(req,res) => {
//         res.send("Hello World")
// })

//route POST /api/user/register
//desc  register new user
//access PUBLIC
 const register = async (req, res,next) => {
    const { email, password, fullName, userType, phone, DOB } = req.body;
    const {isValid, error} = await validateRegisterInput(req.body);
    if (!isValid) return res.status(404).json(error)
      const newUser = new User({
        email,
        password,
        fullName,
        userType,
        phone,
        DOB
    });   
    bcrypt.genSalt(10, (err, salt) => {
        if (err) return res.status(400).json(err);    
        bcrypt.hash(password, salt, (err, hash) => {
            if (err) return res.status(400).json(err);
                newUser.password = hash;
                console.log(hash)
                newUser.save()
                .then(user => res.status(200).json(user))
                .catch(err => res.status(400).json(err));
        });
    })
    // User.findOne({email})
    // .then(user => {
    //     if (user) return res.status(400).json({errors : "email exit"});
    //     User.findOne({phone})
    //     .then(user => {
    //         if(user) return res.status(400).json({errors : "phone exit"}); 
    //         bcrypt.genSalt(10, (err, salt) => {
    //         if (err) return res.status(400).json({errors: "loi 1"});
            
    //         bcrypt.hash(password, salt, (err, hash) => {
    //             if (err) return res.status(400).json({errors: "loi 21"});
    //                 newUser.password = hash;
    //                 console.log(hash)
    //                 newUser.save()
    //                 .then(user => res.status(200).json(user))
    //                 .catch(err => res.status(400).json(err));
    //         });       
    //      })
    //     }).catch(err => res.status(400).json(err));
        
    // })
    // .catch(err => res.status(400).json(err));
}
// router.post("/register", (req, res,next) => {
//   const { email, password, fullName, userType, phone, DOB } = req.body;
// //   console.log(req.body);
// //   res.send(req.body);

//   const newUser = new User({
//     email,
//     password,
//     fullName,
//     userType,
//     phone,
//     DOB
// });

// User.findOne({email})
// .then(user => {
//     if (user) return res.status(400).json({errors : "email exit"});
//     console.log("ok1")
//     User.findOne({phone})
//     .then(user => {
//         if(user) return res.status(400).json({errors : "phone exit"});
//         console.log("ok2")

//         bcrypt.genSalt(10, (err, salt) => {
//         if (err) return res.status(400).json({errors: "loi 1"});
        
//         bcrypt.hash(password, salt, (err, hash) => {
//             if (err) return res.status(400).json({errors: "loi 21"});
//                 newUser.password = hash;
//                 console.log(hash)
//                 newUser.save()
//                 .then(user => res.status(200).json(user))
//                 .catch(err => res.status(400).json(err));
//         });
    
//      })
//     }).catch(err => res.status(400).json(err));
    
// })
// .catch(err => res.status(400).json(err));

// });

//route 
//decsc login
// access
const  login  = (req, res,next) => {
    const {email, password, fingerprint} = req.body;
    User.findOne({email})
    .then(user => {
        if (!user) return Promise.reject({errors: "user does not exit"})
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if(!isMatch) return res.status(400).json(err)    
            const payload = {
                id : user.id,
                email : user.email,
                fullName : user.fullName,
                userType : user.userType
            }
            const KEY = process.env.SECRET_KEY + fingerprint
            jwt.sign(payload,KEY,{expiresIn: "1h"},(err,token) => {
                if(err) return res.status(400).json(err)
                return res.status(200).json({message : "login success"})
            })
        })
    })
    .catch(err => res.status(400).json(err))
}
// router.post("/login", (req, res) => {
//     const {email, password} = req.body;

//     User.findOne({email})
//     .then(user => {
//         if (!user) return Promise.reject({errors: "user does not exit"})

//         bcrypt.compare(password, user.password, (err, isMatch) => {
//             if(!isMatch) return res.status(400).json({errors :' that bai'})
          
//             const payload = {
//                 email : user.email,
//                 fullName : user.fullName,
//                 userType : user.userType
//             }
//             console.log("TCL: payload", payload)
//              jwt.sign(payload,"Cybersoft",{expiresIn: "1h"},(err,token) => {
//                 if(err) return res.status(400).json({errors: " loi me roi "})
//                 console.log("TCL: token", token)
//                 return res.status(200).json({message : "success", token})
//             })
//                 // if(err) return res.status(400).json(err)
//                 // return res.status(200).json({message : "success"})
//         })
//     })
//     .catch(err => res.status(400).json(err))
// })

const testPrivate  = (req, res,next) => {
    res.status(200).json({message : "ban da thay dieu bi mat"})
}

const uploadAvatar = (req,res, next) =>{
    const {id} = req.user;
    User.findById(id) 
    .then(user => {
        if (!user) return Promise.reject({error : 'upload error'})
        user.avatar = req.file.path
        return user.save()
    })
    .then(user => res.status(200).json(user))
    .catch(user => res.status(400).json(user))
}

const getUserById = (req, res, next) => {
    const {id} = req.user;
    User.findById(id)
    .then(user => res.status(200).json(user))
    .catch(err => res.status(400).json(err))
}

module.exports = {login, register,testPrivate,uploadAvatar,getUserById};
