var express = require('express');
var router = express.Router();
const postController = require("../controllers/postController");

router.get("/", postController.posts)

module.exports = router;