const {
  listContacts,
  removeContact,
  addContact,
  updateContact,
} = require("../models/contacts");

const getAllUser = async (req, res) => {
  const getData = await listContacts();
  res.status(200).json({
    message: getData,
    status: "success",
  });
};

const getUserByID = async (req, res) => {
  const user = req.user;
  return res.status(200).json({
    message: user,
    status: "success",
  });
};

const postUser = async (req, res) => {
  const newContact = await addContact(req.body);
  res.status(newContact ? 201 : 400).json({
    message: newContact || "missing required name field",
    status: newContact ? "success" : "error",
  });
};

const putUser = async (req, res) => {
  const changingTheFields = await updateContact(req.user, req.body);
  res.status(changingTheFields ? 200 : 400).json({
    message: changingTheFields || "missing fields",
    status: changingTheFields ? "success" : "error",
  });
};

const deleteUser = async (req, res) => {
  await removeContact(req.user);
  return res.status(200).json({
    message: "contact deleted",
    status: "success",
  });
};

module.exports = {
  getAllUser,
  getUserByID,
  postUser,
  putUser,
  deleteUser,
};
