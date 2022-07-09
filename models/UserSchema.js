const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({

    username: {
        type: String,
        required: true,
        trim: true,
    },

    password: {
        type: String,
        required: true,
        trim: true,
    },

    firstName: {
        type: String,
        required: true,
        trim: true,
    },

    lastName: {
        type: String,
        required: true,
        trim: true
    },

    screenName: {
        type: String, 
        required: true,
        trim: true,
        unique: true,
    },

    description: {
        type: String,
        default: null,
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

});

module.exports = mongoose.model("User", UserSchema);