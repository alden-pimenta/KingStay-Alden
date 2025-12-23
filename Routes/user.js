const express = require("express");
const { route } = require("./listing");
const router = express.Router({ mergeParams: true });
const user= require("../models/user")
const passport= require("passport");
const usercontroller= require("../controllers/users");

router .get('/signup',usercontroller.signupform)

router .post("/signup",usercontroller.signup)


router.get('/login',usercontroller.loginform)


router.post("/login", passport.authenticate('local', { failureRedirect: "/login",failureFlash:true }), usercontroller.login)



router.get ("/logout",usercontroller.logout)

module. exports = router;