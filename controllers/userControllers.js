const { EMAIL_PASSWORD_WRONG } = require("../constants/errorConstants");
const userModel = require("../models/userSchema");
const AppError = require("../validation.helps/myError");
const { tryCatch } = require("../validation.helps/helpers");
const { createToken } = require("../validation.helps/singToken");
const userSubscription = require("../constants/userSubscription");

const registerUser = tryCatch(async (req, res) => {
  const user = await userModel.create(req.body);
  console.log("user", user);
  user.password = undefined;

  await createToken(user);
  console.log("user1", user);
  const { email, subscription } = user;
  console.log("res", res);
  res.status(201).json({
    user: {
      email,
      subscription,
    },
    status: "success",
  });
});

const loginUser = tryCatch(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email }).select("+password");

  if (!user) return next(new AppError(401, EMAIL_PASSWORD_WRONG));

  const passwotdIsValid = await user.checkPassword(password, user.password);
  if (!passwotdIsValid) return next(new AppError(401, EMAIL_PASSWORD_WRONG));

  user.password = undefined;

  const token = await createToken(user);

  res.status(201).json({
    token,
    user: {
      email,
      subscription: user.subscription,
    },
    status: "success",
  });
});

const logoutUser = tryCatch(async (req, res, next) => {
  const user = await userModel.findById(req.user.id);
  user.token = null;
  res.status(204).json({ message: "No Content" });
});

const currentUser = tryCatch(async (req, res, next) => {
  const { email, subscription } = await userModel.findById(req.user.id);
  res.status(201).json({
    user: {
      email,
      subscription,
    },
    status: "success",
  });
});

const patchSubscription = tryCatch(async (req, res, next) => {
  const arraySubscription = Object.values(userSubscription);

  const existingSubscription = arraySubscription.some(
    (item) => item === req.body.subscription
  );

  if (!existingSubscription)
    return next(
      new AppError(400, "Choose " + arraySubscription + " subscription")
    );

  const { email, subscription } = await userModel.findByIdAndUpdate(
    req.user.id,
    req.body,
    { new: true }
  );

  res.status(201).json({
    user: {
      email,
      subscription,
    },
    status: "success",
  });
});

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  currentUser,
  patchSubscription,
};
