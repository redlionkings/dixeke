const mongoose = require("mongoose");
const TripSchema = new mongoose.Schema({
    driverID : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    locationFrom : {type : String, required : true},
    locationTo : {type: String, required : true},
    startTime : {type : Date, required : true},
    availableSeats : {type : Number,  require : true},
    passengerIds : [ {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    }],
    fee : {type : Number,  require: true},
    isFinished : {type : Boolean, default : false}
})

const Trip = mongoose.model("Trip", TripSchema);

module.exports = {
    Trip, TripSchema
}