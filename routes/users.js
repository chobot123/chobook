const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/:id", userController.user_get);

router.get("/username/:username", userController.getByUsername);

router.put("follow/:id", userController.follow);

router.put("unfollow/:id", userController.unfollow);

module.exports = router;
