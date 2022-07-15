const { body, validationResult } = require("express-validator");
const Post = require("../models/PostSchema");


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
    console.log(req.params.id);
    Post.findById(req.params.id)
    .populate("author")
    .populate("content")
    .populate("likes")
    .populate("replies")
    .populate("replyTo")
    .exec((err, thisPost) => {
        if(err){return next(err);}
        return res.status(200).send(
            {
                success: true,
                post: thisPost,
            }
        )
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