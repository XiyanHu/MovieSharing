var express = require("express");
var router = express.Router();
var Movieground = require("../models/movieground");

//INDEX - show all moviegrounds
router.get("/",function(req,res){
    Movieground.find({},function(err,allMoviegrounds){
        if (err){
            console.log("error");    
        }   else{
            res.render("moviegrounds/index",{moviegrounds:allMoviegrounds, currentUser: req.user});   
        }     
    });
});

//CREATE - add new movieground to DB
router.post("/", isLoggedIn, function(req,res){
    // get data form form and add moviegrounds array
    //redirect back to moviegrounds
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newMovieground = {name: name, image: image, description:description,author:author};
    //moviegrounds.push(newMovieground);
    
    //create a new movieground and save to Db
    Movieground.create(newMovieground,function(err,newlyCreated){
         if (err){
            console.log(err);    
        }   else{
            res.redirect("/moviegrounds");
        }      
    });
});

//NEW - show form
router.get("/new", isLoggedIn, function(req,res){
    res.render("moviegrounds/new");
});

//SHOW - shows more info about a single movie
router.get("/:id",function(req,res){
    //find the movie will provided ID
    Movieground.findById(req.params.id).populate("comments").exec(function(err,foundMovieground){
         if (err){
            console.log("error");    
        }   else{
            res.render("moviegrounds/show",{movieground: foundMovieground});    
        }        
    });
});

//middleware
function isLoggedIn(req,res,next){
    if (req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;