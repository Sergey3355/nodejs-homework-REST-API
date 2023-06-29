const express = require("express");
const router = express.Router();
const { checkContact, validUser } = require("../../controllers/checkContacts");

const {
  getAllUser,
  getUserByID,
  postUser,
  putUser,
  deleteUser,
} = require("../../controllers/controllers");

router.get("/", getAllUser);

router.get("/:contactId", checkContact, getUserByID);

router.post("/", validUser, postUser);

router.put("/:contactId", validUser, checkContact, putUser);

router.delete("/:contactId", checkContact, deleteUser);

module.exports = router;
