var mongoose = require("mongoose");
var Movieground = require("./models/movieground");
var Comment = require("./models/comment");


var data = [
    {
        name:"Paycheck",
        image:"https://images-na.ssl-images-amazon.com/images/M/MV5BMTczMzU5NDk4MV5BMl5BanBnXkFtZTYwNDQxNzc3._V1_UX182_CR0,0,182,268_AL_.jpg",
        description:"Ben"
    },
    {
        name:"ssss",
        image:"https://images-na.ssl-images-amazon.com/images/M/MV5BMTczMzU5NDk4MV5BMl5BanBnXkFtZTYwNDQxNzc3._V1_UX182_CR0,0,182,268_AL_.jpg",
        description:"Ben"
    }
];
    
function seedDB(){
    // remove all moive
    Movieground.remove({},function(err){
        if (err){
            console.log("error");
        }
        console.log("remove");
         //add a few movies
        data.forEach(function(seed){
             Movieground.create(seed,function(err,movieground){
                if (err){
                    console.log("err");
                } else{
                    console.log("added a campground");
                    //create a comment
                    Comment.create({
                        text:"hahahahahha",
                        author: "TOM"
                    },function(err,comment){
                        if (err){
                            console.log("err");
                        }else{
                            movieground.comments.push(comment);
                            movieground.save();
                            console.log("created a new comment");
                        } 
                        
                    });
                }
             });    
        });
    });
   
   
}

module.exports = seedDB;
