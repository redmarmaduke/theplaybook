const db = require('../models');
var path = require("path");

/**
 * getIndexPageData
 * 
 * @param {Number} userId
 * 
 * @return response result 
 * 
 * sends the following data to the index page
 * {
 *  games:
 *  {
 *      gameName: String,
 *      gameId: number
 *  },
 *  comments:
 *  {
 *      commentId: number,
 *      userId: number,
 *      gameId: number,
 *      comment: String,
 *      userName: String,
 *      gameName: Number,
 *      hype: Number
 *  }
 * } 
 */
function getIndexPageData(userId) {
    // dev crutch for missing userid
    userId = userId || 1;

    let games = db.Game.findAll({
        limit: 10
    }).then(function (records) {
        return new Promise((resolve, reject) => {
            resolve(records.map((element) => {
                return {
                    gameId: element.dataValues.id,
                    gameName: element.dataValues.name
                };
            }));
        });
    });

    let comments = db.Comment.findAll({
        limit: 10,
        include: [db.Game, db.User]
    }).then(function (records) {
        return new Promise((resolve, reject) => {
            resolve(records.map((element) => {
                return {
                    commentId: element.dataValues.id,
                    userId: element.dataValues.User.id,
                    gameId: element.dataValues.Game.id,
                    comment: element.dataValues.text,
                    userName: element.dataValues.User.username,
                    gameName: element.dataValues.Game.name,
                    hype: element.dataValues.Game.hype
                };
            }));
        });
    });

    let userComments = db.User.findAll({
        where: { id: userId },
        include: [db.Comment]
    }).then(function (records) {
        return new Promise(function (resolve, reject) {
            let comments = records[0].dataValues.Comments.map((element) => {
                return {
                    commentId: element.id,
                    comment: element.text
                };
            });
            resolve(comments);
        });
    });

    return Promise.all([games, comments, userComments]).then(function (promises) {
        return new Promise(function (resolve, reject) {
            resolve({ games: promises[0], comments: promises[1], userComments: promises[2] });
        });
    }).catch(function (error) {
        console.error(error);
        return new Promise(function (resolve, reject) {
            resolve({ comments: {}, games: {}, userComments: {} });
        });
    });
}

function getGamePageData(gameId) {
    let game = db.Game.findOne({
        where: {
            id: gameId
        },
        include: [db.Comment, db.Genre ]
    }).then(function (record) {
        return new Promise((resolve, reject) => {
            let unprocessedComments = record.dataValues.Comments;
            let comments = unprocessedComments.map((element) => {
                return {
                    commentId: element.dataValues.id,
                    comment: element.dataValues.text,
                };
            });
            let unprocessedGenres = record.dataValues.Genres;
            let genres = unprocessedGenres.map((element) => {
                return element.dataValues.name;
            });
            resolve({
                game: {
                    id: record.dataValues.id,
                    name: record.dataValues.name,
                    releaseDate: record.dataValues.releaseDate,
                    hype: record.dataValues.hype,
                    backgroundImage: "https://media.rawg.io/media/games/b72/b7233d5d5b1e75e86bb860ccc7aeca85.jpg",
                    backgroundColor: "0f0f0f",
                    comments: comments,
                    genres: genres
                }
            });
        });
    });

    return game;
}

module.exports = function (app) {
    // index route loads login page
    app.get("/", function (request, response) {
        response.sendFile(path.join(__dirname, "../public/assets/index.html"));
    });
    // loads main page
    app.get("/main", function (request, response) {
        // BUG: userId will be set to 1 by default.
        let userId = 1;
        getIndexPageData(userId).then(function (data) {
            response.render('index', data);
        });
    });

    app.get("/games/:id", function (request, response) {
        let gameId = parseInt(request.params.id);
        getGamePageData(gameId).then(function (data) {
            response.render('game', data);
        });
    });

    // GET route for getting top 10 games 
    app.get("/api/games/", function (req, res) {
        db.Game.findAll({
            limit: 10
        }).then(function (dbGame) {
            res.json(dbGame);
        });
    });

    // GET route for getting latest comments
    app.get("/api/comments/", function (req, res) {
        db.Comment.findAll({
            limit: 10
        }).then(function (dbComment) {
            res.json(dbComment);
        });
    });

    // GET route for retrieving a single comment
    app.get("/api/comments/:id", function (req, res) {
        db.Comment.findAll({
            where: { id: req.params.id }
        }).then(function (dbComment) {
            res.json(dbComment);
        })
    });

    // GET route for retrieving a single game
    app.get("/api/games/:name", function (req, res) {
        db.Game.findAll({
            where: { name: req.params.name }
        }).then(function (dbGame) {
            res.json(dbGame);
        });
    });
    // GET route for retrieving comments for a single game
    app.get("/api/games/:name/comments", function (req, res) {
        db.Game.findAll({
            where: { name: req.params.name },
            include: [db.Comment]
        }).then(function (dbComment) {
            res.json(dbComment);
        });
    });
    // GET route for retrieving votes for a single game
    app.get("/api/games/:id/votes", function (req, res) {
        db.Game.findAll({
            where: { id: req.params.id },
            include: [db.Vote]
        }).then(function (dbVote) {
            res.json(dbVote);
        });
    });

    // GET route for retrieving my comments
    app.get("/api/profile/:userid/comments", function (req, res) {
        db.User.findAll({
            where: { id: req.params.userid },
            include: [db.Comment]
        }).then(function (records) {
            let userComments = records[0].dataValues.Comments.map((element) => {
                return {
                    commentId: element.id,
                    comment: element.text
                };
            });

            res.json(userComments);
        })
    });

    // GET route for retrieving the name by userid
    app.get("/api/profile/:userid/name", function (req, res) {
        db.User.findAll({
            where: { id: req.params.userid },
        }).then(function (records) {
            res.json(records[0].dataValues.username);
        })
    });

    // POST route for adding a new comment
    app.post("/api/comment", function (req, res) {
        db.Comment.create(req.body).then(function (dbComment) {
            res.json(dbComment);
        });
    });

    // POST route for voting 
    app.post("/api/vote", function (req, res) {
        db.Vote.create(req.body).then(function (dbVote) {
            res.json(dbVote);
        });
    });

    // PUT route for updating comment by id
    app.put("/api/comment/:id", function (req, res) {
        db.Comment.update(
            req.body,
            {
                where: {
                    id: req.body.id
                }
            }).then(function (dbComment) {
                res.json(dbComment);
            });
    });

    // DELETE route for deleting comment
    app.delete("/api/comments/:id", function (req, res) {
        db.Comment.destroy({
            where: { id: req.params.id }
        }).then(function (dbComment) {
            res.json(dbComment);
        });
    });

    // POST route for creating a user
    app.post("/api/users", function(req, res){
        db.User.create({
            username: req.body.username,
            password: req.body.password
        }).then(function(dbUser){
            res.json(dbUser)
        })
    });

    // Check user Login info
    app.get("/api/users/:username/:password", function(req, res){
        db.User.findOne({
            where: {
                username: req.params.username,
                password: req.params.password
            }
        }).then(function(user){
            if(user === null){
                res.json(false)
            }
            res.json(user.id)
        });
    });

    // GET route to get information from a specific user
    app.get("/api/user/:id", function(req, res){
        db.User.findOne({
            where: {
                id: req.params.id
            }
        }).then(function(user){
            if(user=== null){
                res.json(false)
            }
            res.json(user)
        });
    });

    return (db);
};
