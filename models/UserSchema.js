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

});

module.exports = mongoose.model("User", UserSchema);