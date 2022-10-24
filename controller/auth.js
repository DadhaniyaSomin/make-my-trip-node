const User = require("./../models/users");
const bcrypt = require("bcryptjs");
const successResponse = require("./../utils/success");
const createError = require("./../utils/error");
const jwt = require("jsonwebtoken");

const register = async (req, res, next) => {
  var salt = bcrypt.genSaltSync(10);
  var passwordHash = bcrypt.hashSync(req.body.password, salt);

  try {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: passwordHash,
    });

    await newUser.save();
    res.status(200).json(
      successResponse(200, "User has been created successfully.", {
        data: newUser,
      })
    );
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const user = await User.findOne({
      username: req.body.username,
    });

  
    //response msg if the user not found.
    if (!user) return next(createError(404, " User not found"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordCorrect) {
      return next(createError(400, "User name or password is incorrect."));
    } else {
      const { password, isAdmin, ...otherDetail } = user._doc;

      const token = jwt.sign(
        { id: user.id, isAdmin: user.isAdmin },
        process.env.SECRET_KEY
      );

      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(successResponse(200, "User found.", { ...otherDetail }));
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { register, login };
