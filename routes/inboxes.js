const express = require('express');
const router = express.Router();
const inboxController = require("../controllers/inboxController");

router.get("/", inboxController.inbox_get);

router.post("/create/chat", inboxController.inbox_create);

//gc
router.post("/create/groupchat", inboxController.create_groupchat); 

//gc
router.put("/:id/addUser", inboxController.add_user);

//gc
router.put("/:id/remUser", inboxController.rem_user);

//gc
router.put("/:id/demote", inboxController.demote_admin);

//gc
router.put("/:id/promote", inboxController.promote_admin);

//gc
router.put("/:id/leave", inboxController.inbox_leave);

//gc
router.delete("/:id/delete", inboxController.delete_inbox);

module.exports = router;