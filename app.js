//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");



const homeStartingContent = "Hey! Welcome to The Techno Blog. \n Here I will be sharing a lot of stuff related to the field of tech. You'll be able to find everything ranging from guides on various tech stacks to my experiences during technical interviews. Do contact me if you have any suggestion or feedback. Happy Reading :) ";
const aboutContent = "Hey! I'm Harshit Khattar, a pre-final year student pursuing B.Tech in Information Technology from Maharaja Surajmal Institute of Technology, New Delhi. Skilled at Web Development, Data Structures & Algorithms, I am a tech enthusiast who loves to explore new things & interact with people. ";
const contactContent = "You can contact me via my E-mail: hkhatter03@gmail.com or message me on LinkedIn: linkedin.com/in/hkhattar14/ . Any feedback or suggestion is highly appreciated!";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

//main().catch(err => console.log(err));

//async function main() {
 // await mongoose.connect('mongodb://localhost:27017/test');
//}

mongoose.connect("mongodb+srv://hkhattar14:!41rattahkH@cluster0.ez3lfq1.mongodb.net/blogDB");

const postSchema = {
  title: String,
  content: String
};

const Post = mongoose.model("Post", postSchema);

app.get("/", function(req, res){

  Post.find({}, function(err, posts){
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts
      });
  });
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });


  post.save(function(err){
    if (!err){
        res.redirect("/");
    }
  });
});

app.get("/posts/:postId", function(req, res){

const requestedPostId = req.params.postId;

  Post.findOne({_id: requestedPostId}, function(err, post){
    res.render("post", {
      title: post.title,
      content: post.content
    });
  });

});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});

