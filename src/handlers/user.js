const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

const login = async (req, res, next) => {
  //Check valid request body
  // static id of user
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw {
      status: 400,
      message: "There were validation errors",
    };
  }
  const { email, password } = req.body;
  try {
    const user = await User.findOne({
      email: email.toLowerCase(),
    });
    const passwordCorrect =
      user === null ? false : await bcrypt.compare(password, user.passwordHash);

    if (!(user && passwordCorrect)) {
      return res.status(401).json({
        status: 401,
        message: "wrong username or password",
      });
    }
    const userForToken = {
      email: email,
      id: user.id,
    };
    const token = jwt.sign(userForToken, process.env.SECRET, {
      expiresIn: "180 days",
    });
    res.status(200).send({
      token,
      firstName: user.firstName,
      lastName: user.lastName,
      email: email,
    });
  } catch (error) {
    next(error);
  }
};

const register = async (req, res, next) => {
  //Check valid request body
  const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    return res.status(422).json({ error: errors.array() });
  }
  try {
    const { email, firstName, lastName, password } = req.body;

    //Check exist username email
    const existedEmail = await User.findOne({ email });
    if (existedEmail) {
      throw {
        status: 400,
        message: "The email is taken",
      };
    }
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
      email,
      firstName,
      lastName,
      passwordHash,
    });

    const savedUser = await user.save();

    res.status(201).json(savedUser.toJSON());
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
  register,
};
