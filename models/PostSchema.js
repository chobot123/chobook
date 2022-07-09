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
    
    { timestamps: true,}
);

module.exports = mongoose.model("Post", PostSchema);