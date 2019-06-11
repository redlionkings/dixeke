// 3rd packages
const express = require("express");
const mongoose  = require("mongoose");

const app = express();
mongoose.connect("mongodb://localhost:27017/xedike", {useNewUrlParser: true})
.then(() => console.log("Connected"))
.catch(err=>console.log(err))
//my package

const port = process.env.port || 5000;
app.listen(port, ()=> {
    console.log(`Server is running on ${port}`)
})
