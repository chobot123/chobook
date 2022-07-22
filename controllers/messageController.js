const {body, validationResult } = require("express-validator");
const Message = require("../models/MessageSchema");
const Inbox = require("../models/InboxSchema");

exports.message_create = [
    
    body("content").trim().isLength({min: 1}),

    async (req, res, next) => {

        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(401).send(
                {
                    success: false,
                    message: "Please enter a message"
                }
            )
        }else {
            
            let messageData = {
                author: req.user,
                content: req.body.content,
            }

            let inboxData = {
                users: req.body.users,
                isGroupChat: (req.body.users.length > 2) ? true : false,
            }
            
        }
    }
]