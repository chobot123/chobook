exports.checkAuth = (req, res, next) => {
    console.log(req.session);
    console.log(req.user);
    if(typeof(req.session.passport) !== "undefined") {
        console.log(typeof(req.session.passport.user) !== "undefined");
        if(typeof(req.session.passport.user) !== "undefined"){
            next();
        }
    }else {
        return res.status(404).send({
            success: false,
            message: "Authorization revoked"
        })
    }
}