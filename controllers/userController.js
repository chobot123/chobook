const User = require("../models/UserSchema");

exports.user_get = async (req, res, next) => {

    const username = (req.params.id === "self") ? req.user : req.params.id;
    const user = await User.findOne({ "username": username});

    if(user === null){
        return res.status(404).send(
            {
                success: false,
                message: "User not found"
            }
        )
    }else {
        return res.status(200).send(
            {
                success: true,
                user: user,
            }
        )
    }
}

exports.getByUsername = (req, res, next) => {
    // console.log("username: " + req.params.username);
    const username = req.params.username;
    User.findOne({
        "username": username,   
    })
    .populate("followers")
    .populate("following")
    .populate("likedPosts")
    .populate("sharedPosts")
    .exec((err, user) => {
        if(err) return next(err);
        if(user){
            return res.status(200).send(
                {
                    success: true,
                    user: user,
                }
            )
        }else {
            return res.status(404).send(
                {
                    success: fail,
                    message: "user not found",
                }
            )
        }
    })
}

exports.follow = (req, res, next) => {
    //add to followers of person user is following
    //add to following of person

    let userToFollow = req.params.id;
    let currUser = req.user;

    User.findByIdAndUpdate(userToFollow, {
        $addToSet: {
            followers: currUser
        }
    }, {new: true}, (err, doc) => {
        if(err) {return next(err);}
        userToFollow = doc;
    })

    User.findByIdAndUpdate(currUser, {
        $addToSet: {
            followers: userToFollow
        }
    }, {new: true}, (err, doc) => {
        if(err) {return next(err);}
        currUser = doc;
    })

    return res.status(200).send(
        {
            success: true,
            currUser: currUser,
            userToFollow: userToFollow
        }
    )
}

exports.unfollow = (req, res, next) => {
    //remove from followers of person user is following
    //remove from following of person following

    let userToUnfollow = req.params.id;
    let currUser = req.user;

    User.findByIdAndUpdate(userToUnfollow, {
        $pull: {
            followers: currUser
        }
    }, {new: true}, (err, doc) => {
        if(err) {return next(err);}
        userToUnfollow = doc;
    })

    User.findByIdAndUpdate(currUser, {
        $pull: {
            followers: userToUnfollow
        }
    }, {new: true}, (err, doc) => {
        if(err) {return next(err);}
        currUser = doc;
    })

    return res.status(200).send(
        {
            success: true,
            currUser: currUser,
            userToUnfollow: userToUnfollow
        }
    )
}