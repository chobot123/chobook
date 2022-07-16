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

module.exports = mongoose.model("Post", PostSchema);