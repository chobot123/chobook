const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({

        username: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },

        password: {
            type: String,
            required: true,
            trim: true,
        },

        firstName: {
            type: String,
            trim: true,
        },

        lastName: {
            type: String,
            trim: true
        },

        description: {
            type: String,
            default: "",
            trim: true,
        },

        followers: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],

        following: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],

        likedPosts: [
            {
                type: Schema.Types.ObjectId,
                ref: "Post",
            }
        ],

        sharedPosts: [
            {
                type: Schema.Types.ObjectId,
                ref: "Post",
            }
        ],
    },

    { 
        timestamps: true,
        toJSON: {virtuals: true },
        toObject: {virtuals: true}
    }
);

UserSchema.virtual("numFollowers").get(function(){
    return this.followers.length;
})

UserSchema.virtual("numFollowing").get(function(){
    return this.following.length;
})

UserSchema.virtual("numLikedPosts").get(function(){
    return this.likedPosts.length;
})

UserSchema.virtual("numSharedPosts").get(function(){
    return this.sharedPosts.length;
})

UserSchema.virtual("numPosts", {
    ref: "Post",
    localField: "_id",
    foreignField: "author",
    count: true,
});

module.exports = mongoose.model("User", UserSchema);