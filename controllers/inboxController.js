const Inbox = require("../models/InboxSchema");

exports.inbox_create = (req, res, next) => {

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
        isGroupChat: (users.length > 2) ? true : false,
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

//remove user from inbox
exports.inbox_remove = (req, res, next) => {

    //rem IF curr_user is ADMIN
    //IF curr_user is LAST member and LEAVES
        //delete inbox

    const inboxID = req.params.id;
    const userToRem = req.body.user;

    Inbox.findByIdAndUpdate({
        $pull: {
            users: userToRem,
        }
    }).exec((err) => {
        if(err) {return next(err);}
        return res.status(200).send(
            {
                success: true,
                message: "User has been removed from the inbox"
            }
        )
    })
}

exports.add_user = async (req, res, next) => {

    const userToAdd = req.body.userToAdd;
    const inboxID = req.params.id;
    
    try {

        const inbox = await Inbox.findById(inboxID);
        if(userToAdd && inbox.users.length === 2) {
            inbox.users.push(userToAdd);
            inbox.isGroupChat = true;
        }

        inbox.save().then((doc) => {
            return res.status(200).send(
                {
                    success: true,
                    inbox: doc,
                }
            )
        })

    }catch(err) {
        return res.status(402).send(
            {
                success: fail,
                message: err,
            }
        )
    }

}