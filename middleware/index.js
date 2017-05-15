var Movieground = require("../models/movieground");
var Comment = require("../models/comment");
var middlewareObj = {};

middlewareObj.checkMoviegroundOwnership = function(req,res,next){
    if (req.isAuthenticated()){
        Movieground.findById(req.params.id,function(err,foundMovieground){
        if (err){
            req.flash("error","Movie not found!");
            console.log(err);
            res.redirect("back");
        }else{
            if (foundMovieground.author.id.equals(req.user._id)){
                next();        
            } else{
                //res.send("You don't have permission to send");
                req.flash("error","Ooops!Permission Denied.");
                res.redirect("back");
            }
        }
        });    
    } else{
        req.flash("error","You need to be logged in first!");
        res.redirect("back");
    }    
}

middlewareObj.checkCommentOwnership = function(req,res,next){
    if (req.isAuthenticated()){
        Comment.findById(req.params.comment_id,function(err,foundComment){
        if (err){
            console.log(err);
            res.redirect("back");
        }else{
            if (foundComment.author.id.equals(req.user._id)){
                next();        
            } else{
                //res.send("You don't have permission to send");
                req.flash("error","Ooops!Permission Denied.");
                res.redirect("back");
            }
        }
        });    
    } else{
        req.flash("error","You need to be logged in first!");
        res.redirect("back");
    }    
}


middlewareObj.isLoggedIn = function(req,res,next){
    if (req.isAuthenticated()){
        return next();
    }
    req.flash("error","You need to be logged in first!");
    res.redirect("/login");
}


module.exports = middlewareObj