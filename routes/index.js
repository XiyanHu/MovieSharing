var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

//root route
router.get("/",function(res,res){
    res.render("landing");    
});


//show register form
router.get("/register",function(req,res){
    res.render("register");
});

//handle sign up form
router.post("/register",function(req,res){
    //res.send("Singing you up");
    var newUser = new User({username: req.body.username});
    User.register(newUser,req.body.password,function(err,user){
        if (err){
            console.log(err);
            req.flash("error",err.message);
            return res.render("register");
        }
        passport.authenticate("local")(req,res,function(){
           req.flash("success","Welcome to MovieSharing! " + user.username);
           res.redirect("/moviegrounds"); 
        });
    });
});

//show login form
router.get("/login",function(req,res){
    res.render("login");
});

//handling login logic
router.post("/login",passport.authenticate("local",
    {
        successRedirect: "/moviegrounds",
        failureRedirect: "/login",
        failureFlash: 'Invalid username or password.'
    }),function(req,res){
        console.log(req.session.returnTo);

});

//logout rout
router.get("/logout",function(req,res){
    req.logout();
    req.flash("success","Logged Out!");
    res.redirect("/moviegrounds");
});


module.exports = router;