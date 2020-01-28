const db = require('../models');
var path = require("path");

function renderIndexPage(response) {
    let games = db.Game.findAll({
        limit: 10
    }).then(function(records) {
        return new Promise((resolve,reject) => {
            console.log(records);
            resolve(records.map(element => element.name));
        });
    });
    let comments = db.Comment.findAll({
        limit: 10
    }).then(function(records) {
        console.log(records);
        return new Promise((resolve,reject) => {
            resolve(records.map(element => element.text));
        });
    });

    return Promise.all([games,comments]).then(function(promises) {
        return response.render('index', { games: promises[0], comments: promises[1]});
    }).catch(function(error) {
        return response.render('index', { comments: [], games: []});
    });
}

module.exports = function(app) {
    // index route loads login page
    app.get("/", function(request,response) {
        return renderIndexPage(response);
    });

    // GET route for getting top 10 games 
    app.get("/api/games/", function(req, res){
        db.Game.findAll({
            limit:10
        }).then(function(dbGame){
            res.json(dbGame);
        });
    });

    // GET route for getting latest comments
    app.get("/api/comments/", function(req, res){
        db.Comment.findAll({
            limit:10
        }).then(function(dbComment){
            res.json(dbComment);
        });
    });

    // GET route for retrieving a single comment
    app.get("/api/comments/:id", function(req, res){
        db.Comment.findAll({
            where: {id: req.params.id}
        }).then(function(dbComment){
            res.json(dbComment);
        })
    });

    // GET route for retrieving a single game
    app.get("/api/games/:name", function(req, res){
        db.Game.findAll({
            where: {name: req.params.name}
        }).then(function(dbGame){
            res.json(dbGame);
        });
    });
    // GET route for retrieving comments for a single game
    app.get("/api/games/:name/comments", function(req, res){
       db.Game.findAll({
           where:{name: req.params.name}, 
           include: [db.Comment]
       }).then(function(dbComment){
           res.json(dbComment);
       });
    });
    // GET route for retrieving votes for a single game
    app.get("/api/games/:id/votes", function(req, res){
        db.Game.findAll({
            where: {id: req.params.id},
            include: [db.Vote]
        }).then(function(dbVote){
            res.json(dbVote);
        });
    });
    // GET route for retrieving my comments
    app.get("/api/profile/:userid/comments", function(req, res){
        db.User.findAll({
            where: {id: req.params.userid},
            include: [db.Comment]
        }).then(function(dbProfile){
            res.json(dbProfile);
        })
    });

    // POST route for adding a new comment
    app.post("/api/comment", function(req, res){
        db.Comment.create(req.body).then(function(dbComment){
            res.json(dbComment);
        });
    });

    // POST route for voting 
    app.post("/api/vote", function(req, res){
        db.Vote.create(req.body).then(function(dbVote){
            res.json(dbVote);
        });
    });

    // PUT route for updating comment
    app.put("/api/comment/:id", function(req, res){
        db.Comment.update(
            req.body, 
            {
                where:{
                    id:req.body.id
                }
            }).then(function(dbComment){
            res.json(dbComment);
        });
    });

    // DELETE route for deleting comment
    app.delete("/api/comments/:id", function(req, res){
        db.Comment.destroy({
            where: {id: req.params.id}
        }).then(function(dbComment){
            res.json(dbComment);
        });
    });

    return (db);
};
