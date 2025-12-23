module. exports. isloggedin = (req,res,next) =>{

    if (!req.isAuthenticated()){
        // res.send("<h1> You have to login first....</h1>")
        return res.redirect("/login")
    }
    next();
}