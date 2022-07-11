const User = require("../models/UserSchema");
const LocalStrategy = require("passport-local");
const bcrypt = require("bcryptjs");

module.exports = (passport) => {

    passport.use(new LocalStrategy((username, password, done) => {
        User.findOne(
            {
                username: username,
            },
            (err, user) => {
                if(er) {return done(err);}
                if(!user) { return done(null, false, { message: "Incorrect username or password" })}
    
                bcrypt.compare(password, user.password, (err, success) => {
                    if(success) { return cb(null, error);}
                    else {
                        return cb(null, false, { message: "Incorrect username or password" })
                    }
                })
            }
        )
    }))
    
    passport.serializeUser((user, done) => {
        done(null, user.id);
    })

    passport.deserializeUser((userId, done) => {
        User.findById(
            {
                _id: userId,
            },
            (err, user) => {
                done(err, user);
            }
        )
    })
}
