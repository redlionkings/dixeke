// 3rd packages
const express = require("express");
const mongoose  = require("mongoose");


mongoose.connect("mongodb://localhost:27017/xedike", {useNewUrlParser: true})
.then(() => console.log("Connected"))
.catch(err=>console.log(err))
//my package

// app.get("/",( req, res) => {
//     res.json({message : "Hello World"})
// })
//middle ware
const app = express();

// middlewares
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, fingerprint,Authorization");
//     next();
// });

//parser middlewares
app.use(express.json())
app.use(express.urlencoded({extended : true}))

//static
app.use("/uploads", express.static("uploads"));
app.use("/api/user",require("./routes/api/user"));  
app.use('/api/trip', require("./routes/api/trip"));

const port = process.env.port || 5000;
app.listen(port, ()=> {
    console.log(`Server is running on ${port}`)
})
