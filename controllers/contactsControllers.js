const { tryCatch } = require("../validation.helps/helpers");
const MyModel = require("../models/contactSchema");

const getAllUser = tryCatch(async (req, res) => {
  res.status(200).json({
    message: req.body,
    status: "success",
  });
});

const getUserByID = (req, res) => {
  res.status(200).json({
    message: req.user,
    status: "success",
  });
};

const postUser = tryCatch(async (req, res) => {
  const newContact = {
    ...req.body,
    owner: req.user.id,
  };
  const contact = await MyModel.create(newContact);
  res.status(201).json({
    message: contact,
    status: "success",
  });
});

const updateContact = tryCatch(async (req, res) => {
  const { id } = req.params;
  const putContact = await MyModel.findByIdAndUpdate({ _id: id }, req.body, {
    new: true,
  }).select("-__v");

  res.status(200).json({
    message: putContact,
    status: "success",
  });
});

const updateStatusContact = tryCatch(async (req, res) => {
  const { id } = req.params;

  if (!Object.keys(req.body).includes("favorite")) {
    return res.status(400).json({
      message: "Missing field favorite",
      status: "error",
    });
  }
  const updateStatus = await MyModel.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
  }).select("-__v");

  res.status(200).json({
    message: updateStatus,
    status: "success",
  });
});

const deleteUser = tryCatch(async (req, res) => {
  await MyModel.findByIdAndDelete({ _id: req.user.id });

  return res.status(200).json({
    message: "contact deleted",
    status: "success",
  });
});

module.exports = {
  getAllUser,
  getUserByID,
  postUser,
  updateContact,
  deleteUser,
  updateStatusContact,
};
