const express = require("express");
const router = express.Router();
const tripController = require("./trip");

const {authenticating,authorizing} = require("../../../middlewares/auth")

//create trip (driver)
router.post("/create-trip",authenticating,authorizing(["driver"]),
tripController.createTrip
)

//passerger 
router.post("/book-trip/:tripID",authenticating,authorizing(["passenger"]),
tripController.bookTrip
)
module.exports = router