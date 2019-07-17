require('dotenv').config()

let mongouri = "";
if (process.env.STAGE === "development") {
    mongouri = process.env.MONGO_URI_DEV
}else if (process.env.STAGE === "production") {
    mongouri = process.env.MONGODB_URI
}
const mongoose  = require("mongoose");
mongoose.connect(mongouri, {useNewUrlParser: true})
.then(() => console.log("Connected"))
.catch(err=>console.log(err))
//my package
const express = require("express");
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
