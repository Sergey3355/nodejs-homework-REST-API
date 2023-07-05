const express = require("express");
const router = express.Router();

const {
  getAllUser,
  getUserByID,
  postUser,
  updateContact,
  deleteUser,
  updateStatusContact,
} = require("../../controllers/controllers");
const { checkUser } = require("../../middlewares/checkUser");
const { validUser } = require("../../middlewares/validUser");

router.get("/", getAllUser);

router.get("/:id", checkUser, getUserByID);

router.post("/", validUser, postUser);

router.put("/:id", checkUser, validUser, updateContact);

router.patch("/:id/favorite", checkUser, updateStatusContact);

router.delete("/:id", checkUser, deleteUser);

module.exports = router;
