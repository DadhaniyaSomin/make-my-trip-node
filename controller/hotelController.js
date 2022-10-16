const Hotel = require("./../models/hotels");

const createHotel = async function (req, res,next) {
    const newHotel = new Hotel(req.body);
    try {
      const saveHotel = await newHotel.save();
      res.status(200).json(saveHotel);
    } catch (err) {
      return next(err);
    }
  }

 const updateHotel=  async function (req, res,next) {
    try {
      const updateHotel = await Hotel.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      if(updateHotel != null){
        res.status(200).json(updateHotel);
      }else{
        res.status(500).json( {"msg" : "No Data Found"});
      }
    } catch (err) {
      return next(err);
    }
  }

  const deleteHotel = async function (req, res ,next) {
    try {
      const  deleteHotel=  await Hotel.findByIdAndDelete(
        req.params.id
      );
      if( deleteHotel != null){
        res.status(200).json( {"msg" : "Data has been deleted."});
      }else{
        res.status(500).json( {"msg" : "No Data Found."});
      }
    } catch (err) {
      return next(err);
    }
  }

  const getHotels = async function (req, res,next) {

    // const failed = true;
    // if(failed) return next(createError("401"," You are not authanticated."));
  
    try {
      const allHotels =  await Hotel.find();
      if( allHotels != null){
        res.status(200).json( allHotels );
      }else{
        res.status(500).json( {"msg" : "No Data Found."});
      }
    } catch (err) {
      return next(err);
    }
  }

  const getHotel = async function (req, res,next) {

    try {
        const hotel = await Hotel.findById(req.params.id);
        res.status(200).json(hotel);
      } catch (err) {
        next(err);
      }
  }
  module.exports = { createHotel ,updateHotel, deleteHotel, getHotel, getHotels};