const MyModel = require("../models/userSchema");
const { tryCatch } = require("../validation.helps/helpers");

const checkUser = tryCatch(async (req, res, next) => {
  const { id } = req.params;
  const userExist = await MyModel.findOne({ _id: id }).select("-__v");
  if (!userExist) {
    return res.status(404).json({
      message: "Not found",
      status: "error",
    });
  }

  req.user = userExist;
  next();
});

module.exports = {
  checkUser,
};
