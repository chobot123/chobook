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
            //get inbox (params?)
            //check that user is found in GC
            //update lastMessage => be this created message

            Inbox.findOne({
                $and: {
                    _id: req.params.id,
                    users: {
                        $in: [req.user]
                    }
                }
            }, (err, inbox) => {
                if(err) {return next(err);}

                //if the user => inbox and inbox is correct,
                let message = {
                    author: req.user, 
                    content: req.body.content,
                    inbox: inbox,
                    seenBy: [
                        req.user,
                    ]
                }

                message.save((err, message) => {
                    if(err) {return next(err);}

                    inbox.save(
                        {
                            lastMessage: message,
                        },
                        (err, result) => {
                            if(err) {return next(err);}

                            return res.status(200).send(
                                {
                                    success: true,
                                    inbox: result,
                                }
                            )
                        }
                    )
                })
            })
        }
    }
]