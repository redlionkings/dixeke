const { User } = require("../../../model/user");
const { Trip } = require("../../../model/trip");

const createTrip = (req, res, next) => {
  const driverID = req.user.id;
  const { locationFrom, locationTo, startTime, availableSeats, fee } = req.body;
  User.findById(driverID)
    .then(driver => {
      if (!driver) return Promise.reject({ error: "tai xe k ton tai" });
      const newTrip = new Trip({
        driverID,
        locationFrom,
        locationTo,
        startTime,
        fee,
        availableSeats
      });
      return newTrip.save();
    })
    .then(Trip => res.status(200).json(Trip))
    .catch(Trip => res.status(40).json(Trip));
};

// const bookTrip = async (req, res, next) => {
//     const {tripID} = req.params;
//    const {numberofBookingSeats} = req.body;
//     const passengerId = req.user.id;
//     // const passenger = await User.findById(passengerId);
//     // const trip = await Trip.findById(tripID);
//     // console.log(passenger)
//     // if(!passenger) return res.status(404).json({error : "Not Found Passager"})
//     // if(!trip) return res.status(404).json({error : "trip not found"})
//     // console.log(numberofBookingSeats)
//     // console.log(trip.availableSeats)

//     // if(numberofBookingSeats > trip.availableSeats) return res.status(404).jso({error: "Your book seat is over"})

//     // trip.availableSeats = trip.availableSeats - numberofBookingSeats;

//     // trip.passengerIds.push(passengerId);
//     // const savedtrip =  await trip.save()
//     // return res.status(200).json(savedtrip)

// }

const bookTrip = (req, res, next) => {
  const { tripID } = req.params;
  const { numberofBookingSeats } = req.body;
  const passengerId = req.user.id;
  Promise.all([
        User.findById(passengerId),
        Trip.findById(tripID)
  ])
  .then(results => {const passenger = results[0];
                    const trip = results[1]
    if(!passenger) return res.status(404).json({error : "Not Found Passager"})
    if(!trip) return res.status(404).json({error : "trip not found"})
    console.log("TCL: bookTrip -> trip.availableSeats", trip.availableSeats)
    if(numberofBookingSeats > trip.availableSeats) return res.status(404).json({error: "Your book seat is over"})  
    trip.availableSeats = trip.availableSeats - numberofBookingSeats;

    trip.passengerIds.push(passengerId);
    return trip.save()
})
.then(trip => {res.status(200).json(trip);})
.catch(err=> res.status(404).json(err))
};
module.exports = { createTrip, bookTrip };
