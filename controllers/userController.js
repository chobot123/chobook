const User = require("../models/PostSchema");

exports.user_get = async (req, res, next) => {

    const username = req.params.username;
    const user = await User.findOne({ "username": username});

    if(user === null){
        return res.sendStatus(404); //not found
    }else {
        return res.send(user);
    }
}