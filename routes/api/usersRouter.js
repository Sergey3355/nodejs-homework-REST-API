const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  currentUser,
  patchSubscription,
} = require("../../controllers/userControllers");
const { verifyToken } = require("../../middlewares/verifyToken");
const validUser = require("../../middlewares/validUser");
const router = express.Router();

router.post("/register", validUser, registerUser);
router.post("/login", validUser, loginUser);
router.post("/logout", verifyToken, logoutUser);
router.post("/current", verifyToken, currentUser);
router.patch("/", verifyToken, patchSubscription);

module.exports = router;
