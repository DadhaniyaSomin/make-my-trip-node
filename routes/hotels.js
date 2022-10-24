const express = require("express");
const router = express.Router();
const createError = require("../utils/error");
const hotelController = require("./../controller/hotelController");



//create
router.post("/", hotelController.createHotel);

//update
router.put("/:id", hotelController.updateHotel);

//delete
router.delete("/:id", hotelController.deleteHotel);

//getHotels
router.get("/", hotelController.getHotels); 

//getHotel
router.get("/:id", hotelController.getHotel);


module.exports = router;
