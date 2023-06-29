const jwt = require("jsonwebtoken");
const userModel = require("../models/userSchema");
require("dotenv").config();

const createToken = async (user) => {
  const { id } = user;

  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });

  await userModel.findByIdAndUpdate(user._id, { token });
  return token;
};

module.exports = {
  createToken,
};
