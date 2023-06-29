const { NOT_FOUND } = require("../constants/errorConstants");
const { tryCatch } = require("../validation.helps/helpers");
const MyModel = require("../models/contactSchema");

const checkContact = tryCatch(async (req, res, next) => {
  const { id } = req.params;
  const userExist = await MyModel.findOne({ _id: id }).select("-__v");
  if (!userExist) {
    return res.status(404).json({
      message: NOT_FOUND,
      status: "error",
    });
  }

  req.user = userExist;
  next();
});

module.exports = {
  checkContact,
};
