const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MessageSchema = new Schema({

    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },

    content: {
        type: String,
        trim: true,
    },

    inbox: {
        type: Schema.Types.ObjectId,
        ref: "Inbox",
    },

    seenBy: [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    ],

});

module.exports = mongoose.model("Message", MessageSchema);