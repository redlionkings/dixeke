const express = require("express");
const router = express.Router()
const {User} = require("../../model/user");
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
router.post("/register", (req, res)=>{
    const {email, password, fullName, userType, phone, DOB} = req.body;
    console.log(req.body);
    res.send(req.body);

    const newUser = new User({
        email, password, fullName, userType,phone, DOB
    })
    newUser.save()
    .then(user => res.status(200).json(user))
    .catch(err => res.status(400).json(err))
})



module.exports = router;