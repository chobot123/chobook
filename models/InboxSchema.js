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
    },

    admin: [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
        }
    ]

})

deleteReferences = function(next) {
    console.log(this);
    this.model("Message").deleteMany({
        inbox: this._id,
    }, (err) => {
        if(err) {next(err);}
        console.log("Successfully removed all messages in inbox")
    })
    next();
}

InboxSchema.pre("remove", { document: true, query: false}, deleteReferences);


module.exports = mongoose.model("Inbox", InboxSchema);