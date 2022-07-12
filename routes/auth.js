const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.get("/login", authController.login_get);

router.post("/login", authController.login_post);

router.post("/signup", authController.signup);

router.post("/logout", authController.logout);

module.exports = router;

