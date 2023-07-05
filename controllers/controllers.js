const {
  listContacts,
  removeContact,
  addContact,
  updateContact,
} = require("../models/contacts");

const getAllUser = async (req, res) => {
  const getData = await listContacts();
  res.status(200).json(getData);
};

const getUserByID = async (req, res) => {
  const user = req.user;
  return res.status(200).json(user);
};

const postUser = async (req, res) => {
  const newContact = await addContact(req.body);
  if (newContact) {
    res.status(201).json(newContact);
  } else {
    const arr = ["name", "phone", "email"];
    const reqArr = Object.keys(req.body);

    const difference = arr.filter((x) => !reqArr.includes(x));

    res
      .status(400)
      .json({ message: `missing required ${difference[0]} field` });
  }
};

const putUser = async (req, res) => {
  if (!Object.keys(req.body).length) {
    res.status(400).json({ message: "missing fields" });
    return;
  }

  const changingTheFields = await updateContact(req.user, req.body);
  if (changingTheFields) {
    res.status(200).json(changingTheFields);
  } else {
    res.status(404).json({ message: "Not found" });
  }
};

const deleteUser = async (req, res) => {
  await removeContact(req.user);
  return res.status(200).json({
    message: "contact deleted",
  });
};

module.exports = {
  getAllUser,
  getUserByID,
  postUser,
  putUser,
  deleteUser,
};
