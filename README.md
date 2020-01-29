# The Playbook
App that gives users information based on games that are searched/featured.

# Technologies
* HTML
* CSS
* Javascript
* JQuery
* API
* Pure.CSS
* Handlebars
* Express Session
* MySQL
* Axios

# Deployed Site
* 

# Screenshot
    - Welcome Screen
![Image description](link-to-image)

    - Top Games
![Image description](link-to-image)

	- Profile page
![Image description](link-to-image)

    - Comments
![Image description](link-to-image)

# Code

* Navbar via handlebars

```
<div id="navigation">
  <ul>
    <li id="lhome"><a href="#00">HOME</a></li>
    <li id="lproducts"><a href="#01">GAMES</a></li>
    <li id="lsolutions"><a href="#02">FORUM</a></li>
    <li id="lmysterious"><a href="#03">ABOUT US</a></li>
  </ul>
</div>
```
* Server

```
const Express = require('express');
const ExpressHandlebars = require('express-handlebars');

const PORT = process.env.PORT || 8080;
const express = Express();

express.use(Express.urlencoded({ extended: true }));
express.use(Express.json());
express.use(Express.static("public"));
express.engine("handlebars", ExpressHandlebars({ defaultLayout: "default" }));
express.set("view engine", "handlebars");

// acquire the routes for express
let db = require('./controllers/routes.js')(express);

// { force: true } applied to sync to drop tables
db.sequelize.sync().then(function () {
    express.listen(PORT, function (error) {
        if (error) {
            throw error;
        }
        console.log("Express listening on PORT:", PORT);
    });
});
```
* Example of a route for retrieving a single game

```
app.get("/api/games/:name", function (req, res) {
        db.Game.findAll({
            where: { name: req.params.name }
        }).then(function (dbGame) {
            res.json(dbGame);
        });
```

* Example of a route for retrieving comments for a single game. 

```
    app.get("/api/games/:name/comments", function (req, res) {
        db.Game.findAll({
            where: { name: req.params.name },
            include: [db.Comment]
        }).then(function (dbComment) {
            res.json(dbComment);
        });
    });
```

# Authors
- Manuel Nunes
    - [Github](hhttps://github.com/redmarmaduke/theplaybook)
    - [LinkedIn](https://www.linkedin.com/in/manuel-nunes-272ba31b/)
- Benjamin Vokes
    - [Github](https://www.github.com/benjivokes)
    - [LinkedIn](https://www.linkedin.com/in/benjamin-vokes-2420a8197)
- Rachel Yeung
    - [Github](https://www.github.com/xrachhel)
    - [LinkedIn](https://www.linkedin.com/in/rachel-yeung-814986159/)