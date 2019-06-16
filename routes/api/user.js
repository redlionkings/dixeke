const express = require("express");
const router = express.Router();
const { User } = require("../../model/user");
const bcrypt = require("bcryptjs");
const jwt =require("jsonwebtoken")
const {authenticating,authorizing} = require("../../middlewares/auth")
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
router.post("/register", (req, res,next) => {
  const { email, password, fullName, userType, phone, DOB } = req.body;
//   console.log(req.body);
//   res.send(req.body);

  const newUser = new User({
    email,
    password,
    fullName,
    userType,
    phone,
    DOB
});

User.findOne({email})
.then(user => {
    if (user) return res.status(400).json({errors : "email exit"});
    console.log("ok1")
    User.findOne({phone})
    .then(user => {
        if(user) return res.status(400).json({errors : "phone exit"});
        console.log("ok2")

        bcrypt.genSalt(10, (err, salt) => {
        if (err) return res.status(400).json({errors: "loi 1"});
        
        bcrypt.hash(password, salt, (err, hash) => {
            if (err) return res.status(400).json({errors: "loi 21"});
                newUser.password = hash;
                console.log(hash)
                newUser.save()
                .then(user => res.status(200).json(user))
                .catch(err => res.status(400).json(err));
        });
    
     })
    }).catch(err => res.status(400).json(err));
    
})
.catch(err => res.status(400).json(err));



// .catch(err => res.status(400).json({errors: "loi213 2221"}));
  //gia dinh : input valid11
//   User.findOne({email})
//   .then(user => {
//     if (user) return res.status(400).json({errors: "email exit" });
//         user.findOne({phone}) 
//         .then(user => {
//             if (user) return res.status(400).json({errors: "phone exit" });
           
//     })
//     .catch(err => res.status(400).json(err));
    
//   });
});


//route 
//decsc login
// access
router.post("/login", (req, res) => {
    const {email, password} = req.body;

    User.findOne({email})
    .then(user => {
        if (!user) return Promise.reject({errors: "user does not exit"})

        bcrypt.compare(password, user.password, (err, isMatch) => {
            if(!isMatch) return res.status(400).json({errors :' that bai'})
          
            const payload = {
                email : user.email,
                fullName : user.fullName,
                userType : user.userType
            }
            console.log("TCL: payload", payload)
             jwt.sign(payload,"Cybersoft",{expiresIn: "1h"},(err,token) => {
                if(err) return res.status(400).json({errors: " loi me roi "})
                console.log("TCL: token", token)
                return res.status(200).json({message : "success", token})
            })
                // if(err) return res.status(400).json(err)
                // return res.status(200).json({message : "success"})
        })
    })
    .catch(err => res.status(400).json(err))
})


router.get("/test-private", authenticating, author  izing,(req, res) => {
    res.status(200).json({message : "ban da thay dieu bi mat"})
})
module.exports = router;
