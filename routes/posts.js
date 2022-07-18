const express = require('express');
const router = express.Router();
const postController = require("../controllers/postController");

//get user's posts
router.get("/", postController.posts)

router.get("/:id", postController.post_get)

router.post("/", postController.post_create)

router.delete("/:id", postController.post_delete)

router.put("/update/like/:id", postController.likePost)

router.put("/update/dislike/:id", postController.dislikePost)

router.put("/update/share/:id", postController.sharePost)

router.put("/update/unshare/:id", postController.unsharePost)

module.exports = router;