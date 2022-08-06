const express = require('express');
const router = express.Router();
const postController = require("../controllers/postController");

//get posts user created
// router.get("/", postController.posts)

router.get("/:username/posts", postController.posts);

router.get("/:username/posts/likes", postController.getLikes)

router.get("/:username/posts/replies", postController.getReplies) 

router.get("/:username/posts/shares", postController.getShares)

//get posts from user following and user created
router.get("/all", postController.allPosts)

router.get("/:id", postController.post_get)

router.post("/", postController.post_create)

router.delete("/:id", postController.post_delete)

router.put("/update/like/:id", postController.likePost)

router.put("/update/dislike/:id", postController.dislikePost)

router.put("/update/share/:id", postController.sharePost)

router.put("/update/unshare/:id", postController.unsharePost)

router.put("/update/refresh/:id", postController.refresh)

module.exports = router;