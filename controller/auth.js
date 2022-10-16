const User = require('./../models/users');
const bcrypt =require('bcryptjs');
const successResponse = require('./../utils/success');
const createError = require ('./../utils/error');

const register = async (req, res, next) => {

    var salt = bcrypt.genSaltSync(10);
    var passwordHash = bcrypt.hashSync(req.body.password, salt);

   try{
      const newUser = new User({
        username : req.body.username,
        email : req.body.email,
        password : passwordHash
      })

      await newUser.save();
      res.status(200).json(successResponse(200,"User has been created successfully." , {data : newUser} ))
   }catch(err){
      next(err);
   }
}

const login = async (req, res, next) => {
   try{
      const user = User.findOne({
         username : req.body.username
      });
      //response msg if the user not found.
      if(!user) return next(createError(404," User not found"));

      console.log(user.password);

      const isPasswordCorrect = await bcrypt.compare(req.body.password , user.password);
      //response msg is the password or user is  not correct.
      if(!isPasswordCorrect) return next(createError(400,"User name or password is incorrect."));
      res.status(200).json(successResponse(200,"User found." , {data : user} ))
   }catch(err) {
      next(err);
   }
}

module.exports = {register, login};