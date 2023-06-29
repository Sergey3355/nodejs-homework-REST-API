const express = require("express");
const router = express.Router();

const {
  getAllUser,
  getUserByID,
  postUser,
  updateContact,
  deleteUser,
  updateStatusContact,
} = require("../../controllers/contactsControllers");
const { checkContact } = require("../../middlewares/checkContact");
const { verifyToken } = require("../../middlewares/verifyToken");
const { validContact } = require("../../middlewares/validContact");
const { pagination } = require("../../middlewares/pagination");

router.use(verifyToken);

router.get("/", pagination, getAllUser);

router.patch("/:id/favorite", checkContact, updateStatusContact);

router.post("/", validContact, postUser);

router.get("/:id", checkContact, getUserByID);

router.put("/:id", checkContact, validContact, updateContact);

router.delete("/:id", checkContact, deleteUser);

module.exports = router;
