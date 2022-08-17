const User = require("../models/UserSchema");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");

exports.login_get = (req, res, next) => {
    res.render("login")
}

exports.login_post = [

    body("username").trim().escape(),
    body("password").trim().escape(),

    (req, res, next) => {
        passport.authenticate("local", {session: false}, (err, user) => {

            if(err) {next(err);}
            if(!user) {
                return res.status(401).send(
                    {
                        success: false,
                        message: "Invalid Username and/or Password",
                    }
                )
            } else {
                req.logIn(user, (err) => {
                    if(err) {return next(err);}
                    return res.status(200).send(
                        {
                            success: true,
                            message: "Successfully Authenticated",
                        }
                    );
                })
            }
        })(req, res, next)
    }
]

exports.signup = [

    body("firstName").trim().escape(),
    body("lastName").trim().escape(),
    body("username").trim().escape(),
    body("password").trim().isStrongPassword().escape(),
    
    async (req, res, next) => {
        
        const errors = validationResult(req);
        console.log(errors);

        const user = await User.findOne({username: req.body.username});

        //if there are errors or the user exists
        if(!errors.isEmpty() || user) {
            if(user) {
                return res.status(401).send(
                    {
                        success: false,
                        message: "Username already exists."
                    }
                )
            } else {
                // console.log(req.body);
                return res.status(401).send(
                    {
                        success: false,
                        message: "Invalid Password. Try again.",
                    }
                )
            }
        }else { //user doesn't exist    
            
            //hash password
            bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
                if(err) {return next(err);}

                const userData = {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    username: req.body.username,
                    password: hashedPassword,
                }           

                const newUser = new User(userData);

                newUser.save((err, user) => {
                    if(err) { return next(err);}
                    return res.status(200).send({
                        success: true,
                        message: "New user created"
                    })
                })
            })
        }
    }
]

exports.logout = (req, res, next) => {
    req.logOut((err) => {
        if(err) {return next(err);}
        req.session = null;
        return res.status(200).send(
            {
                success: true,
                message: "Successfully ended session"
            }
        )
    });
}

exports.checkSession = (req, res, next) => {
    if(req.session.passport){

        User.findOne(req.user)
        .exec((err, user) => {
            if(err) {return next(err)}

            if(user) {
                return res.status(200).send(
                    {
                        success: true,
                        user: user,
                    }
                )
            }else {
                return res.status(402).send(
                    {
                        success: false,
                        user: null,
                    }
                )
            }
        })
    }else {
        return res.status(402).send(
            {
                success: false,
                user: null,
            }
        )
    }
}