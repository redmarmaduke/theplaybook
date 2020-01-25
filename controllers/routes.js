const db = require('../models');

module.exports = function(app) {
    app.get("/", function(request,response) {
        db.User.findAll().then(function(reason) {
            console.log(reason);
        });
        response.render('hello');
    });

    return (db);
};