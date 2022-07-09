const Post = require("../models/PostSchema");

/**
 * Organized by (Newest => Oldest)
 * Posts by (Following, Me)
 */
exports.posts = async (req, res, next) => {

    const user = req.user;
    let listOfUsers;
    let lastPostId = req.lastPostId;

    //if the user is following people
    if(user.following){

        //Get list of user ids the USER is following + add USER to list
        listOfUsers = [...user.following]; 
    }

    listOfUsers.push(user._id);

    const posts = getPosts(listOfUsers, lastPostId);
    
    res.status(200).send(posts);
}

//get posts by array of user id
async function getPosts(userList, lastPostId){

    let posts = await Post.find(
        {
            "author": {"$in": userList}
        }
    )
    .sort({"createdAt": -1})
    .populate("author")
    .populate("likes")
    .populate("sharedBy")
    .populate("replies")

    if(lastPostId !== null){
        posts.find({
            "_id": {"$gt": lastPostId}
        })
        .limit(10)
        .exec((err, postList) => {
            if(err) {console.log(err)}
            lastPostId = postList.at(-1)._id;
        })
    }else {
        posts
        .limit(10)
        .exec((err, postList) => {
            if(err) {console.log(err)}
            lastPostId = postList.at(-1)._id;
        })
    }

    return posts, lastPostId;
}