var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    Movieground = require("./models/movieground"),
    Comment = require("./models/comment"),
    User = require("./models/user"),  
    seedDB = require("./seeds");

var commentsRoutes = require("./routes/comments"),
    moviegroundRoutes = require("./routes/moviegrounds"),
    indexRoutes = require("./routes/index");
    
    
mongoose.connect("mongodb://localhost/movie_sharing");
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
//seedDB();

//PASSPORT CONFIG
app.use(require("express-session")({
    secret: "Once again ahahahhaha",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    next();
})

//requiring routes
app.use("/",indexRoutes);
app.use("/moviegrounds",moviegroundRoutes);
app.use("/moviegrounds/:id/comments",commentsRoutes);

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


app.listen(process.env.PORT,process.env.IP,function(){
    console.log("The movieSharing server has started!");
});