const express = require('express');
const router = express.Router();
const postController = require("../controllers/postController");

router.get("/", postController.posts)

module.exports = router;