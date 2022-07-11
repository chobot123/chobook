const User = require("../models/UserSchema");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");

exports.login = [

    body("username").trim(),
    body("password").trim(),

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
    body("password").trim().escape().withMessage(`The Password must have:
                                                  Atleast 8 Characters,
                                                  A Lowercase Letter,
                                                  An Uppercase Letter,
                                                  A Number,
                                                  A Symbol(@,!,$, etc)`),
    
    async (req, res, next) => {
        
        const errors = validationResult(req);

        const user = await User.findOne({username: req.body.username});

        //if there are errors or the user exists
        if(!errors.isEmpty() || user) {
            if(user) {
                return res.status(200).send(
                    {
                        success: false,
                        message: "Username already exists"
                    }
                )
            } else {
                return res.status(200).send(
                    {
                        success: false,
                        message: errors.array(),
                    }
                )
            }
        }else { //user doesn't exist    
            
            //hash password
            bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
                if(err) {return next(err);}

                const newUser = new User({
                    firstName: req.body.firstName,
                    lastname: req.body.lastName,
                    username: req.body.username,
                    password: hashedPassword,
                })

                await newUser.save((err) => {
                    if(err) { return next(err);}
                    return res.status(200).send({
                        success: true,
                        user,
                    })
                })
            })
        }
    }
]