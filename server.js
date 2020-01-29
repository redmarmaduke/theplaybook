const Express = require('express');
const ExpressHandlebars = require('express-handlebars');
const ExpressSession = require('express-session');

const PORT = process.env.PORT || 8080;
const express = Express();

express.use(Express.urlencoded({ extended: true }));
express.use(Express.json());
express.use(Express.static("public"));

express.use(ExpressSession({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

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
