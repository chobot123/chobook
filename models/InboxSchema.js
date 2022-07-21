const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const InboxSchema = new Schema({

    users: [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    ],

    isGroupChat: {
        type: Boolean,
        default: false,
    },

    lastMessage: {
        type: Schema.Types.ObjectId,
        ref: "Message",
    }

})

module.exports = mongoose.model("Inbox", InboxSchema);