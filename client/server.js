// 3rd packages
const express = require("express");
require('dotenv').config()

const app = express();

//parser middlewares
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use('/',express.static('public'))

const port = process.env.PORT || 5000;
app.listen(port, ()=> {
    console.log(`Server is running on ${port}`)
})
