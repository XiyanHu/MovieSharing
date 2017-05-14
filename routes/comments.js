var express = require("express");
var router = express.Router({mergeParams:true});
var Movieground = require("../models/movieground");
var Comment = require("../models/comment");

//Comments New
router.get("/new", isLoggedIn, function(req,res){
    Movieground.findById(req.params.id,function(err,movieground){
        if (err){
            console.log(err);
        }
        else{
             res.render("comments/new", {movieground: movieground});    
        }
    });
});

//Comments create
router.post("/", isLoggedIn, function(req,res){
    //lookup with id
    Movieground.findById(req.params.id,function(err, movieground) {
       if (err){
           console.log(err);
           res.redirect("/moviegrounds");
       } else{
            Comment.create(req.body.comment,function(err,comment){
                if (err){
                   console.log(err);
                } else{
                    //add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    movieground.comments.push(comment);
                    movieground.save();
                    res.redirect("/moviegrounds/" + movieground._id);
                }        
            });   
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
