const express = require("express");
const router = express.Router();
const createError = require("../utils/error");
const userController = require("./../controller/userController");



//create

//update
router.put("/:id", userController.updateUser);

//delete
router.delete("/:id", userController.deleteUser);

//getHotels
router.get("/", userController.getUsers); 

//getHotel
router.get("/:id", userController.getUser);


module.exports = router;
