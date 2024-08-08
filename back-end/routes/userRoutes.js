// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController.js");
const authenticate = require("../middlewares/authMiddleware");

router.post("/register", (req, res) => {
  userController.register(req, res);
});
router.post("/login", (req, res) => {
  userController.login(req, res);
});

router.post("/logout", userController.logout);

router.delete("/:id", authenticate, (req, res) => {
  userController.deleteUser(req, res);
});

module.exports = router;
