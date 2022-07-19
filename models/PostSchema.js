const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostSchema = new Schema({

        author: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },

        content: {
            type: String,
            trim: true,
        },

        likes: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],

        sharedBy: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],

        replies: [
            {
                type: Schema.Types.ObjectId,
                ref: "Post",
            },
        ],

        replyTo: {
            type: Schema.Types.ObjectId,
            ref: "Post",
        },

        replyChain: [
            {
                type: Schema.Types.ObjectId,
                ref: "Post",
            }  
        ]
    },
    
    { 
        timestamps: true,
        toJSON: {virtuals: true },
        toObject: {virtuals: true}
    }
);

PostSchema.virtual("numLikes").get(function(){
    return this.likes.length;
});

PostSchema.virtual("numShares").get(function(){
    return this.sharedBy.length;
})

PostSchema.virtual("numReplies").get(function(){
    return this.replies.length;
})

deleteReferences = function(next){

    this.model("User").updateMany({likedPosts: this._id}, {
        $pull: {likedPosts: this._id}
    }, (err) => {
        if(err) {next(err);}
        console.log("Successfully removed post from User (LikedPosts)")
    });

    this.model("User").updateMany({sharedPosts: this._id}, {
        $pull: {sharedPosts: this._id}
    }, (err) => {
        if(err) {next(err);}
        console.log("Successfully removed post from User (SharedPosts)")
    });

    this.model("Post").updateMany({replies: this._id}, {
        $pull: {replies: this._id}
    }, (err) => {
        if(err) {next(err);}
        console.log("Successfully removed post from Post (ReplyTo)")
    });

    this.model("Post").deleteMany({replyChain: this._id}, (err) => {
        if(err) {next(err);}
        console.log("Successfully removed post from Post (Reply Chain)")
    });
    next();
}

PostSchema.pre("deleteOne", { document: true, query: false}, deleteReferences);

module.exports = mongoose.model("Post", PostSchema);