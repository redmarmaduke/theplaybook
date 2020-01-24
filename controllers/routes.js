// API routes
var db = require("../models");
var path = require("path");

module.exports = function(app){
    // index route loads login page
    app.get("/", function(req, res){
        res.sendFile()
    });

    // GET route for getting top 10 games 
    app.get("/api/games/", function(req, res){

    });

    // GET route for getting latest comments
    app.get("/api/comments/", function(req, res){

    });

    // GET route for retrieving a single game
    app.get("/api/games/:id", function(req, res){

    });

    // GET route for retrieving comments for a single game
    app.get("/api/games/:id/comments", function(req, res){

    });

    // GET route for retrieving votes for a single game
    app.get("/api/games/:id/votes", function(req, res){

    });

    // GET route for retrieving my comments
    app.get("/api/profile/:userid/comments", function(req, res){

    });

    // POST route for adding a new comment
    app.post("/api/comment", function(req, res){

    });

    // POST route for voting 
    app.post("/api/vote", function(req, res){

    });

    // PUT route for updating comment
    app.put("/api/comment", function(req, res){

    });

    // DELETE route for deleting comment
    app.delete("/api/comments/:id", function(req, res){

    });








}