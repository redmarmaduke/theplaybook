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

db.sequelize.sync({ force: true }).then(function () {
    express.listen(PORT, function (error) {
        if (error) {
            throw error;
        }
        console.log("Express listening on PORT:", PORT);
    });
});
