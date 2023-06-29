const AppError = require("../validation.helps/myError");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const userModel = require("../models/userSchema");
const { NOT_AUTHORIZED, NOT_ALLOW } = require("../constants/errorConstants");

const verifyToken = async (req, res, next) => {
  const token =
    req.headers.authorization?.startsWith("Bearer") &&
    req.headers.authorization.split(" ")[1];
  try {
    if (!token) throw new Error();
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const currentUser = await userModel.findById(decoded.id);

    if (!currentUser) throw new Error();
    req.user = currentUser;
    next();
  } catch (error) {
    return next(new AppError(401, NOT_AUTHORIZED));
  }
};

const allowFor =
  (...subscription) =>
  (req, res, next) => {
    if (subscription.includes(req.user.subscription)) return next();
    next(new AppError(403, NOT_ALLOW));
  };

module.exports = {
  allowFor,
  verifyToken,
};
