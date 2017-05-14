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
            return res.render("register");
        }
        passport.authenticate("local")(req,res,function(){
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
        failureRedirect: "/login"
    }),function(req,res){
    
});

//logout rout
router.get("/logout",function(req,res){
    req.logout();
    res.redirect("/moviegrounds");
});

//middleware
function isLoggedIn(req,res,next){
    if (req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;