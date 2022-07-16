const { body, validationResult } = require("express-validator");
const Post = require("../models/PostSchema");
const User = require("../models/UserSchema");


//gets posts of the user
exports.posts = (req, res, next) => {
    let currentUser;
    if((typeof req.body.user) !== "undefined"){
        currentUser = req.body.user; 
    }else{
        currentUser = req.user; //session user
    }
    Post.find({author: currentUser.id})
    .sort({createdAt: -1,})
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

    (req, res, next) => {
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(401).send(
                {
                    success: false,
                    message: "Please enter a message"
                }
            )
        }else {
            let post = new Post({
                author: req.user._id,
                content: req.body.content,
            })

            post.save((err, thisPost) => {
                if(err) {return next(err);}
                
                console.log(thisPost);
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
        .exec((err) => {
            if(err) {return next(err);}
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

    const user = await User.findByIdAndUpdate(req.user,
        {
            $addToSet: {likedPosts: req.params.id},
        }, {new: true}
    ).catch((err) => {return next(err)});

    const post = await Post.findByIdAndUpdate(req.params.id, 
        {
            $addToSet: {likes: req.user.id },
        }, {new: true}
    ).catch((err) => {return next(err)});

    return res.status(200).send(
        {
            success: true,
            userHasLiked: true,
        }
    )
}

//dislike a post
exports.dislikePost = async (req, res, next) => {
    
    const user = await User.findByIdAndUpdate(req.user,
        {
            $pull: {likedPosts: req.params.id},
        }, {new: true}
    ).catch((err) => {return next(err)});

    const post = await Post.findByIdAndUpdate(req.params.id, 
        {
            $pull: {likes: req.user.id },
        }, {new: true}
    ).catch((err, result) => {
        return next(err)
    });

    return res.status(200).send(
        {
            success: true,
            userHasLiked: false,
            user,
            post
        }
    )
}