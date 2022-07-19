exports.checkAuth = (req, res, next) => {
    if(typeof(req.session.passport) !== "undefined") {
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