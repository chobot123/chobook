const { body, validationResult } = require("express-validator");
const Post = require("../models/PostSchema");
const User = require("../models/UserSchema");


//gets posts of the current user
exports.posts = (req, res, next) => {

    Post.find({author: req.user})
    .sort({createdAt: -1,})
    .populate("author")
    .populate("content")
    .populate("replyTo")
    .exec((err, posts) => {
        if(err) {
            return next(err);
        }else {
            return res.status(200).send(
                {
                    success: true,
                    posts: posts,
                }
            )
        }
    })
}

exports.getPosts = (req, res, next) => {
    const username = req.params.username;

    User.findOne({username: username})
    .exec((err, user) => {
        if(err){
            return next(err);
        }else {
            if(user) {
                Post.find({author: user})
                .sort({createdAt: -1,})
                .populate("author")
                .populate("content")
                .populate("replyTo")
                .exec((err, posts) => {
                    if(err) {
                        return next(err);
                    }else {
                        return res.status(200).send(
                            {
                                success: true,
                                posts: posts,
                            }
                        )
                    }
                })
            }
        }
    })

    Post.find({author: user})
    .sort({createdAt: -1,})
    .populate("author")
    .populate("content")
    .populate("replyTo")
    .exec((err, posts) => {
        if(err) {
            return next(err);
        }else {
            return res.status(200).send(
                {
                    success: true,
                    posts: posts,
                }
            )
        }
    })
}

exports.allPosts = (req, res, next) => {
    //get most recent posts made by user, following
    Post.find({
        $or: [
            {
                author: req.user,
            },
            {
                author: {
                    $in: req.user.following
                }
            }
        ]
    })
    .sort({createdAt: -1,})
    .populate("author")
    .populate("content")
    .populate("replyTo")
    .exec((err, posts) => {
        if(err) {
            return next(err);
        }else {
            return res.status(200).send(
                {
                    success: true,
                    posts: posts,
                }
            )
        }
    })
}

//get single post
exports.post_get = (req, res, next) => {
    const post_id = req.params.id;
    let userHasLiked = false;
    let userHasShared = false;
    
    User.findOne({likedPosts: post_id}, (err, result) => {
        if(err) { console.log(err);}
        if(result !== null) {
            userHasLiked = true;
        }
    })

    User.findOne({sharedPosts: post_id}, (err, result) => {
        if(err) {console.log(err);}
        if(result !== null){
            userHasShared = true;
        }
    })

    Post.findById(post_id)
    .populate("author", "firstName lastName username")
    .populate("content")
    .populate("likes")
    .populate("replies")
    .populate("replyTo")
    .exec((err, thisPost) => {
        if(err){return next(err);}

        return res.status(200).send({
            success: true,
            post: thisPost,
            currentUser: {
                userLiked: userHasLiked,
                userShared: userHasShared,
            }
        })
    })
}

//create a post
exports.post_create = [
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
            let replyChain = [];

            let post = new Post({
                author: req.user,
                content: req.body.content,
            });

            if(req.body.replyTo){

                let replyToPost = await Post.findById(req.body.replyTo);
                post.replyChain = replyToPost.replyChain;
                post.replyChain.push(req.body.replyTo);
            }

            post.save((err, thisPost) => {
                if(err) {return next(err);}
                
                console.log("this post" + thisPost);
                if(req.body.replyTo !== "undefined") {
                    //update replies of replyTo post
                    Post.findByIdAndUpdate(req.body.replyTo,
                        {
                            $addToSet: {replies: thisPost._id}
                        }
                    ).catch((err) => console.log(err))
                }
                return res.status(200).send(
                    {
                        success: true,
                        post: thisPost,
                    }
                )
            })
        }
    }
]

//delete a post
exports.post_delete = (req, res, next) => {
    Post.findByIdAndDelete(req.params.id)
        .exec((err, doc) => {
            if(err) {return next(err);}
            doc.deleteOne();
            return res.status(200).send(
                {
                    success: true,
                    deleted: true,
                }
            )
        })
}

//like a post
exports.likePost = async (req, res, next) => {

    User.findByIdAndUpdate(req.user,
        {
            $addToSet: {likedPosts: req.params.id},
        },
    ).catch((err) => {return next(err)});

    const post = await Post.findByIdAndUpdate(req.params.id, 
        {
            $addToSet: {likes: req.user.id },
        }, {new: true}
    ).catch((err) => {return next(err)});

    return res.status(200).send(
        {
            success: true,
            post: post,
            currentUser: {
                userLiked: true,
            }
        }
    )
}

//dislike a post
exports.dislikePost = async (req, res, next) => {
    
    User.findByIdAndUpdate(req.user,
        {
            $pull: {likedPosts: req.params.id},
        },
    ).catch((err) => {return next(err)});

    const post = await Post.findByIdAndUpdate(req.params.id, 
        {
            $pull: {likes: req.user.id },
        }, {new: true}
    ).catch((err) => {
        return next(err)
    });

    return res.status(200).send(
        {
            success: true,
            post: post,
            currentUser: {
                userLiked: false,
            }
        }
    )
}

//share a post
exports.sharePost = async (req, res, next) => {

    User.findByIdAndUpdate(req.user,
        {
            $addToSet: {sharedPosts: req.params.id},
        },
    ).catch((err) => {return next(err)});

    const post = await Post.findByIdAndUpdate(req.params.id, 
        {
            $addToSet: {sharedBy: req.user.id },
        }, {new: true}
    ).catch((err) => {return next(err)});

    return res.status(200).send(
        {
            success: true,
            post: post,
            currentUser: {
                userShared: true,
            }
        }
    )
}

//unshare a post
exports.unsharePost = async (req, res, next) => {
    
    User.findByIdAndUpdate(req.user,
        {
            $pull: {sharedPosts: req.params.id},
        },
    ).catch((err) => {return next(err)});

    const post = await Post.findByIdAndUpdate(req.params.id, 
        {
            $pull: {sharedBy: req.user.id },
        }, {new: true}
    ).catch((err) => {
        return next(err)
    });

    return res.status(200).send(
        {
            success: true,
            post: post,
            currentUser: {
                userShared: false,
            }
        }
    )
}

exports.refresh = async (req, res, next) => {
    
    let post = await Post.findById(req.params.id);
    post.populate("replyTo");
    return res.send(post);
}