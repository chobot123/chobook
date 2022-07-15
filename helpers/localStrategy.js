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

                if(err) {return done(err);}
                if(!user) { return done(null, false, { message: "Incorrect username or password" })}
    
                bcrypt.compare(password, user.password, (err, success) => {

                    if(success) { return done(null, user);}
                    else {
                        return done(null, false, { message: "Incorrect username or password" })
                    }
                })
            }
        )
    }))
    
    passport.serializeUser((user, done) => {
        done(null, user.id);
    })

    passport.deserializeUser((userId, done) => {
        User.findById(userId,
            (err, user) => {
                done(err, user);
            }
        )
    })
}
