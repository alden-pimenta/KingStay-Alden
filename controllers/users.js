const user = require("../models/user")

module.exports.signupform = (req,res)=>{
    res.render("users/signup.ejs")
}

module.exports.signup = async(req,res)=>{
    try {
        let { username, email, password } = req.body;
        const newuser = new user({ email, username })
        const reg = await user.register(newuser, password);
        console.log(reg);

        req.login(reg,(err)=>{
        if(err){
           return next(err);
        }
        res.redirect("/listings")
    })
        // req.flash("Success", "User was register");
        // res.redirect("/Listings");
    }catch(e){
        console.log(e);
        res.redirect("/signup")
    }
};


module.exports.loginform = (req, res)=>{
    res.render("users/login.ejs")
}

module.exports.login =  async (req,res)=>{
    res.redirect("/listings")
}

module.exports.logout=  (req,res)=>{
    req.logout((err)=>{
        if(err){
           return next(err);
        }
        // res.flash("success","You are logged out");
        res.redirect("/listings")
    }) 
}

