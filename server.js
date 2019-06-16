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

//parser middlewares
app.use(express.json())
app.use(express.urlencoded({extended : true}))

app.use("/api/user",require("./routes/api/user"));  

const port = process.env.port || 5000;
app.listen(port, ()=> {
    console.log(`Server is running on ${port}`)
})
