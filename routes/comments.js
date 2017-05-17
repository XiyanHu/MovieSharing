var express = require("express");
var router = express.Router({mergeParams:true});
var Movieground = require("../models/movieground");
var Comment = require("../models/comment");
var middleware = require("../middleware");

//Comments New
router.get("/new", middleware.isLoggedIn, function(req,res){
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
router.post("/", middleware.isLoggedIn, function(req,res){
    //lookup with id
    Movieground.findById(req.params.id,function(err, movieground) {
       if (err){
           console.log(err);
           res.redirect("/moviegrounds");
       } else{
            Comment.create(req.body.comment,function(err,comment){
                if (err){
                    req.flash("error","Ooops!Something went wrong");
                   console.log(err);
                } else{
                    //add username and id to comment
                    comment.date = new Date();
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    movieground.comments.push(comment);
                    movieground.save();
                    req.flash("success","Successfully created comment!");
                    res.redirect("/moviegrounds/" + movieground._id);
                }        
            });   
       }
    });
});

// COMMENT EDIT
router.get("/:comment_id/edit",middleware.checkCommentOwnership, function(req,res){
    Comment.findById(req.params.comment_id,function(err, foundComment) {
        if (err){
            res.redirect("back");
        }else{
            res.render("comments/edit",{movieground_id: req.params.id,comment: foundComment});  
        }
    });
    
});

//COMMENT UPDATE
router.put("/:comment_id",middleware.checkCommentOwnership,function(req,res){
    Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err, updatedComment) {
        if (err){
            res.redirect("back");
        }else{
            res.redirect("/moviegrounds/"+ req.params.id);
            
        }
    });
    
});

//COMMENT Destroy
router.delete("/:comment_id", middleware.checkCommentOwnership , function(req,res){
    Comment.findByIdAndRemove(req.params.comment_id,function(err){
        if (err){
            res.redirect("back");
        }else{
            req.flash("success","Comment deleted.");
            res.redirect("/moviegrounds/" + req.params.id);
        }
    })
});





module.exports = router;
