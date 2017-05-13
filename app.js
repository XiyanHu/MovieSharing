var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    Movieground = require("./models/movieground"),
    Comment = require("./models/comment"),
    User = require("./models/user"),  
    seedDB = require("./seeds");


mongoose.connect("mongodb://localhost/movie_sharing");
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));
seedDB();


// Movieground.create({
//     name: "The Dark Knight",
//     image: "https://images-na.ssl-images-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_UX182_CR0,0,182,268_AL_.jpg",
//     description: "The most successful superhero movie"
//     },function(err,movieground){
//         if (err){
//             console.log("error");    
//         }   else{
//             console.log("Newly one");
//             console.log(movieground);
//         } 
//     });

    var moviegrounds = [
            {name: "The Dark Knight",image: "https://images-na.ssl-images-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_UX182_CR0,0,182,268_AL_.jpg"},
            {name: "Paycheck",image: "https://images-na.ssl-images-amazon.com/images/M/MV5BMTczMzU5NDk4MV5BMl5BanBnXkFtZTYwNDQxNzc3._V1_UX182_CR0,0,182,268_AL_.jpg"},
            {name: "Passengers",image: "https://images-na.ssl-images-amazon.com/images/M/MV5BMTk4MjU3MDIzOF5BMl5BanBnXkFtZTgwMjM2MzY2MDI@._V1_UX182_CR0,0,182,268_AL_.jpg"},
            {name: "Harry Potter and the Deathly Hallows: Part 2",image: "https://images-na.ssl-images-amazon.com/images/M/MV5BMTY2MTk3MDQ1N15BMl5BanBnXkFtZTcwMzI4NzA2NQ@@._V1_UX182_CR0,0,182,268_AL_.jpg"},
            {name: "Saving Private Ryan",image: "https://images-na.ssl-images-amazon.com/images/M/MV5BZjhkMDM4MWItZTVjOC00ZDRhLThmYTAtM2I5NzBmNmNlMzI1XkEyXkFqcGdeQXVyNDYyMDk5MTU@._V1_UY268_CR0,0,182,268_AL_.jpg"},
            {name: "The Lord of the Rings: The Return of the King",image: "https://images-na.ssl-images-amazon.com/images/M/MV5BOWY1NjI5MDUtMzUzNS00N2FlLTkwM2YtMDQ0ZGZmN2E3YWMxXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_UX182_CR0,0,182,268_AL_.jpg"},
            {name: "Titanic",image: "https://images-na.ssl-images-amazon.com/images/M/MV5BMDdmZGU3NDQtY2E5My00ZTliLWIzOTUtMTY4ZGI1YjdiNjk3XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_UX182_CR0,0,182,268_AL_.jpg"}
        ]

app.get("/",function(res,res){
    
    res.render("landing");    
});

//INDEX - show all moviegrounds
app.get("/moviegrounds",function(req,res){
    Movieground.find({},function(err,allMoviegrounds){
        if (err){
            console.log("error");    
        }   else{
            res.render("moviegrounds/index",{moviegrounds:allMoviegrounds});   
        }     
    });
        
    // res.render("moviegrounds",{moviegrounds:moviegrounds});
});

//CREATE - add new movieground to DB
app.post("/moviegrounds",function(req,res){
    // get data form form and add moviegrounds array
    //redirect back to moviegrounds
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var newMovieground = {name: name, image: image, description:description};
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
app.get("/moviegrounds/new",function(req,res){
    res.render("moviegrounds/new");
});

//SHOW - shows more info about a single movie
app.get("/moviegrounds/:id",function(req,res){
    //find the movie will provided ID
    Movieground.findById(req.params.id).populate("comments").exec(function(err,foundMovieground){
         if (err){
            console.log("error");    
        }   else{
            res.render("moviegrounds/show",{movieground: foundMovieground});    
        }        
    });
    
    
    // render show template with that movie
    // res.send("Show Page");
    
});


// ===================
//   COMMENTS ROUTES
// ==================

app.get("/moviegrounds/:id/comments/new",function(req,res){
    Movieground.findById(req.params.id,function(err,movieground){
        if (err){
            console.log(err);
        }
        else{
             res.render("comments/new", {movieground: movieground});    
        }
    });
   
});

app.post("/moviegrounds/:id/comments",function(req,res){
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
                    movieground.comments.push(comment);
                    movieground.save();
                    res.redirect("/moviegrounds/" + movieground._id);
                }        
            });   
       }
    });
    
});


app.listen(process.env.PORT,process.env.IP,function(){
    console.log("The movieSharing server has started!");
});