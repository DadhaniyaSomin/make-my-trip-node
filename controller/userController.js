const User = require("./../models/users");



 const updateUser=  async function (req, res,next) {
    try {
      const updateUser = await User.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      if(updateUser != null){
        res.status(200).json(updateUser);
      }else{
        res.status(500).json( {"msg" : "No Data Found"});
      }
    } catch (err) {
      return next(err);
    }
  }

  const deleteUser = async function (req, res ,next) {
    try {
      const  deleteUser =  await User.findByIdAndDelete(
        req.params.id
      );
      if( deleteUser != null){
        res.status(200).json( {"msg" : "Data has been deleted."});
      }else{
        res.status(500).json( {"msg" : "No Data Found."});
      }
    } catch (err) {
      return next(err);
    }
  }

  const getUsers = async function (req, res,next) {

    try {
      const allUsers =  await User.find();
      if( allUsers != null){
        res.status(200).json( allUsers );
      }else{
        res.status(500).json( {"msg" : "No Data Found."});
      }
    } catch (err) {
      return next(err);
    }
  }

  const getUser = async function (req, res,next) {

      try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
      } catch (err) {
        next(err);
      }
  }
  module.exports = { updateUser, deleteUser, getUser, getUsers};