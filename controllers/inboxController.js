const Inbox = require("../models/InboxSchema");

exports.inbox_create = (req, res, next) => {

    const user = req.body.user;

    if(!user) {
        return res.status(401).send(
            {
                success: false,
                message: "user do not exist"
            }
        )
    }

    const inboxData = {
        users: [req.user, user],
        isGroupChat: false,
    }

    Inbox.find(inboxData, (err, result) => {
        if(err) {return next(err);}

        if(result) {
            return res.status(400).send(
                {
                    success: fail,
                    message: "Inbox already exists"
                }
            )
        }else if(result === null) {
            result.save((err, doc) => {
                if(err) {return next(err)}

                return res.status(200).send(
                    {
                        success: true,
                        doc: doc,
                    }
                )
            })
        }
    })
}

exports.create_groupchat = (req, res, next) => {

    const users = req.body.users;
    
    if(!users || users.length === 0) {
        return res.status(401).send(
            {
                success: false,
                message: "user(s) do not exist"
            }
        )
    }
    
    users.push(req.user);
    
    const inboxData = {
        users: users,
        isGroupChat: true,
        admin: req.user,
    }
    
    Inbox.create(inboxData)
        .then((inbox) => {
            return res.status(200).send(
                {
                    success: true,
                    inbox: inbox,
                }
            )
        })
        .catch((err) => {
            return res.status(401).send({
                success: false,
                message: err,
            })
        })
}    

//get all inboxes of current user
exports.inbox_get = (req, res, next) => {
    Inbox.find({
        users: req.user,
    })
        .populate("users")
        .populate("lastMessage")
        .populate("admin")
        .exec((err, inboxes) => {
            if(err) {
                return next(err);
            }else {
                return res.status(200).send(
                    {
                        success: true,
                        inboxes: inboxes,
                    }
                )
            }
        }
    )
}

//leave chat
exports.inbox_leave = async (req, res, next) => {

    //if user is admin and there are no other admins 
        //next user in array is admin
    //if user is last in gc, delete gc and all messages
    Inbox.findByIdAndUpdate(req.params.id, {
        $pull: {
            users: req.user,
            admin: req.user,
        }
    }, {new: true}, (err, result) => {
        if(err) {return next(err);}

        if(result) {
            //check if there are other admins
                //if not make other user admin 
                if(result.users.length > 0) {
                    //if there are users
                    if(result.admin.length === 0) { //and there are no admin
                        //make user[0] be new admin as well
                        let oldestMember = result.users[0];
                        result.admin.push(oldestMember);
                        result.save((err, result) => {
                            if(err) {return next(err);}

                            return res.status(200).send(
                                {
                                    success: true,
                                    doc: result,
                                }
                            )
                        })
                    }
                }else {
                    //redirect in front-end to delete GC
                    return res.status(303).send(
                        {
                            success: true,
                            doc: result,
                        }
                    )
                }
        }
    })
}

exports.delete_inbox = async (req, res, next) => {
    const doc = req.body.doc;

    try {
        await doc.remove();
        return res.status(200).send(
            {
                success: true,
                message: "Group chat has been deleted"
            }
        )
    }catch(err) {
        console.log(err);
    }
}


//only for GC
exports.add_user = async (req, res, next) => {
    
    try {

        const userToAdd = req.body.userToAdd;
        const inboxID = req.params.id;

        const inbox = await Inbox.findById(inboxID);
        if(inbox.isGroupChat && userToAdd) {
            inbox.users.push(userToAdd);
            inbox.save().then((doc) => {
                return res.status(200).send(
                    {
                        success: true,
                        inbox: doc,
                    }
                )
            })
        }else {
            return res.status(402).send(
                {
                    success: false,
                    message: "Sorry Something went wrong"
                }
            )
        }

    }catch(err) {
        console.log(err);
        return res.status(402).send(
            {
                success: fail,
                message: err,
            }
        )
    }
}


//Only for GC
exports.rem_user = (req, res, next) => {

    //req.body.user

    Inbox.findById(req.params.id, 
        {
            admin: req.user,
        }, (err, result) => {
            if(err) {
                return next(err);
            }
            //the curr user is an admin for the inbox
            if(result) {
                Inbox.findByIdAndUpdate(req.params.id,
                    {
                        $pull: {
                            users: req.body.user,
                            admin: req.body.user,
                        }
                    }, {new: true}, (err, result) => {
                        if(err) { return next(err)}
                        return res.status(200).send(
                            {
                                success: true,
                                inbox: result,
                            }
                        )
                    }
                )
            }
        }
    )
}

exports.demote_admin = (req, res, next) => {

    const adminToDemote = req.body.user;

    Inbox.findById(req.params.id, 
        {
            admin: req.user,
        }, (err, result) => {
            if(err) {return next(err);}

            if(result && adminToDemote !== "undefined") {
                //curr user is admin of doc

                result.admin.pull(adminToDemote);
                result.save((err, result) => {
                    if(err) {return next(err);}

                    return res.status(200).send(
                        {
                            success: true,
                            doc: result,
                        }
                    )
                })
            }
        }
    )
}

exports.promote_admin = (req, res, next) => {

    const adminToPromote = req.body.user;

    Inbox.findById(req.params.id,
        {
            admin: req.user,
        }, (err, result) => {
            if(err) {return next(err);}

            if(result && adminToPromote !== "undefined") {
                //curr user is admin
                result.admin.push(adminToPromote);
                result.save((err, result) => {
                    if(err) {return next(err);}

                    return res.status(200).send(
                        {
                            success: true,
                            doc: result,
                        }
                    )
                })
            }
        }
    )
}